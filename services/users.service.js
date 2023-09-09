const amqp = require('amqplib');
const rabbitmqConfig = require('../config/aws-rabbitMQ.config');
const UploadsRepository = require("../repositories/users.repository");
const { User } = require('../models');

const { RekognitionClient, DetectLabelsCommand } = require("@aws-sdk/client-rekognition");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');

class UploadService {
	constructor() {
		this.uploadRepository = new UploadsRepository(User);
		this.rekognitionClient = new RekognitionClient({ region : process.env.AWS_REGION });
		this.s3Client = new S3Client({ region : process.env.AWS_REGION });
	}

	sendMessage = async ( messageData ) => {
		const connection = await amqp.connect(rabbitmqConfig);
		const channel = await connection.createChannel();

		const queueName = process.env.AWS_RABBITMQ_QUEUE_NAME; // 사용할 큐 이름

		await channel.assertQueue(queueName, {
			durable : true, arguments : {
				'x-dead-letter-exchange' : "MA-DLX"
			}
		});

		const message = JSON.stringify(messageData);
		channel.sendToQueue(queueName, Buffer.from(message));

	};

	insertUser = async ( userEmail ) => {
		const result = await this.uploadRepository.insertUser(userEmail);
		return result;
	};

	findUser = async ( userEmail ) => {
		const result = await this.uploadRepository.findUser(userEmail);
		return result;
	};

	getUser = async ( userEmail ) => {
		const result = await this.uploadRepository.getUser(userEmail);
		return result;
	};


	async processRekognition( req ) {
		return new Promise(( resolve, reject ) => {
			const rekoImageMiddleware = this.getRekoImageMiddleware();
			rekoImageMiddleware(req, {}, async ( error ) => {
				if ( error instanceof multer.MulterError ) {
					return resolve({ error : 'Multer error' });
				} else if ( error ) {
					return resolve({ error : 'Unknown error' });
				}


				const imageBytes = req.file.buffer;
				const userEmail = req.user.email;
				const userEmailEncoded = encodeURIComponent(userEmail);
				const uniqueFileName = Date.now() + '-' + userEmail + '-' + req.file.originalname;
				const uniqueFileNameEncoded = Date.now() + '-' + userEmailEncoded + '-' + req.file.originalname;
				req.uniqueFileNameEncoded = uniqueFileNameEncoded;

				const params = {
					Image : { Bytes : imageBytes },
					MaxLabels : 10,
					MinConfidence : 90,
				};

				const command = new DetectLabelsCommand(params);
				try {
					const data = await this.rekognitionClient.send(command);
					const labels = data.Labels.map(( label ) => label.Name);

					if ( labels.includes('Cat') || labels.includes('Dog') ) {


						let objectLabel = ''; // 기본값으로 'Unknown' 설정

						if ( labels.includes('Cat') ) {
							objectLabel = 'Cat';
						} else if ( labels.includes('Dog') ) {
							objectLabel = 'Dog';
						}
						// Upload processed image to S3
						const uploadParams = {
							Bucket : process.env.AWS_S3_BUCKET_NAME,
							Key : 'origin/' + uniqueFileName,
							Body : imageBytes,
							ContentType : 'image/',
						};

						const uploadCommand = new PutObjectCommand(uploadParams);
						await this.s3Client.send(uploadCommand);

						const tagsArray = JSON.parse(req.body.tags);
						const tag = tagsArray.map(tagObject => tagObject.value);
						const tagTrim = tag.join('').replace(/[^a-zA-Z0-9가-힣]/g, '');

						const bgPrompt = `${objectLabel} in ${tagTrim}`

						return resolve({ uniqueFileName, objectLabel, bgPrompt });
					} else {
						return resolve({ error : 'The uploaded image is not a cat or dog.' });
					}
				} catch ( err ) {
					return resolve({ error : 'Error in rekognition middleware' });
				}
			});
		});
	}

	getRekoImageMiddleware() {
		const storage = multer.memoryStorage();
		const rekoImage = multer({ storage : storage });
		return rekoImage.single('file');
	}

}

module.exports = UploadService;





