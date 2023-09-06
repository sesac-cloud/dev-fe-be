// const multer = require('multer');
// const { RekognitionClient, DetectLabelsCommand } = require("@aws-sdk/client-rekognition");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const rekognitionClient = new RekognitionClient({ region : process.env.AWS_REGION });
// const s3Client = new S3Client({ region : process.env.AWS_REGION });
// const storage = multer.memoryStorage();
// const rekoImage = multer({ storage : storage });
//
// const rekoImageMiddleware = rekoImage.single('file');
//
// const processRekognition = async ( req, res, next ) => {
// 	try {
// 		rekoImageMiddleware(req, res, async error => {
// 			if ( error instanceof multer.MulterError ) {
// 				return res.status(400).json({ error : 'Multer error' });
// 			} else if ( error ) {
// 				return res.status(500).json({ error : 'Unknown error' });
// 			}
//
// 			const imageBytes = req.file.buffer;
//
// 			const userEmail = req.user.email;
//
// 			const userEmailEncoded = encodeURIComponent(userEmail)
//
// 			const uniqueFileName = Date.now() + '-' + userEmail + '-' + req.file.originalname;
//
// 			const uniqueFileNameEncoded = Date.now() + '-' + userEmailEncoded + '-' + req.file.originalname;
// 			req.uniqueFileNameEncoded = uniqueFileName;
//
// 			const params = {
// 				Image : { Bytes : imageBytes },
// 				MaxLabels : 10,
// 				MinConfidence : 90,
// 			};
//
// 			const command = new DetectLabelsCommand(params);
// 			const data = await rekognitionClient.send(command);
//
// 			const labels = data.Labels.map(label => label.Name);
// 			if ( labels.includes('Cat') || labels.includes('Dog') ) {
// 				req.imageLabels = labels;
//
// 				// Upload processed image to S3
// 				try {
// 					const uploadParams = {
// 						Bucket : process.env.AWS_S3_BUCKET_NAME,
// 						Key : uniqueFileName, // Provide a suitable key name
// 						Body : imageBytes,
// 						ContentType : 'image/', // Adjust the content type accordingly
// 					};
//
// 					console.log('uniqueFileName', uniqueFileName);
//
// 					const uploadCommand = new PutObjectCommand(uploadParams);
// 					await s3Client.send(uploadCommand);
//
// 				} catch ( s3UploadError ) {
// 					console.error('Error uploading image to S3:', s3UploadError);
// 					return res.status(500).json({ error : 'Error uploading image to S3' });
// 				}
//
// 				next(); // 다음 미들웨어 실행
// 			} else {
// 				return res.status(400).json({ error : 'The uploaded image is not a cat or dog.' });
// 			}
//
// 		});
// 	} catch ( error ) {
// 		console.error('Error in rekognition middleware:', error);
// 		res.status(500).json({ error : 'Error in rekognition middleware' });
// 	}
// };
//
// module.exports = processRekognition;
