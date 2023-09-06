const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/aws-config');
const amqp = require('amqplib');
const UploadService = require('../services/users.service');

class UploadController {
	constructor() {
		this.uploadService = new UploadService();
	}

sendMQ = async (req, res) => {
  const userEmail = req.user.email;
  const userCheck = await this.uploadService.findUser(userEmail);

  if (userCheck.errorMessage) {
    return res.status(400).json({ errorMessage: userCheck.errorMessage });
  }

  try {
    const result = await this.uploadService.processRekognition(req);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }


const messageData = {
  animalType: result.objectLabel,
  userMail: userEmail,
  originPhoto: result.uniqueFileName.split('-').slice(2).join('-'),
};


    console.log('messageData', messageData);

    await this.uploadService.sendMessage(messageData);
    await this.uploadService.insertUser(userEmail);

    res.status(200).json({ message: 'Message sent successfully.' });
    console.log(messageData.objectURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the message.' });
  }
};

	getUser = async ( req, res ) => {
    const userEmail = req.user.email;
    const userCheck = await this.uploadService.getUser(userEmail);
    res.send(userCheck);
  }



//MQ get
	// test2 = async ( req, res ) => {
	// 	await this.uploadService.test2();
	// 	try {
	// 		res.status(200).json({ message : 'Message sent successfully.' });
	// 	} catch ( error ) {
	// 		console.error(error);
	// 		res.status(500).json({ error : 'An error occurred while sending the message.' });
	// 	}
	// };


	// uploadFile = async ( req, res ) => {
	//
	// 	const file = req.file;
	// 	if ( !file ) {
	// 		return res.status(400).send('No file uploaded.');
	// 	}
	//
	// 	try {
	// 		res.status(200).json({
	// 			message : 'Image uploaded successfully.',
	// 			result : file.location,
	// 		});
	//
	// 	} catch ( error ) {
	// 		console.error(error);
	// 		res.status(400).json({ error : error.message });
	// 	}
	//
	// };

}

module.exports = UploadController;
