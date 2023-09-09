const UploadService = require('../services/users.service');

class UploadController {
	constructor() {
		this.uploadService = new UploadService();
	}

	sendMQ = async ( req, res ) => {
		const userEmail = req.user.email;
		const userCheck = await this.uploadService.findUser(userEmail);

		if ( userCheck.errorMessage ) {
			return res.status(400).json({ errorMessage : userCheck.errorMessage });
		}

		try {
			const result = await this.uploadService.processRekognition(req);

			if ( result.error ) {
				return res.status(400).json({ error : result.error });
			}

			const messageData = {
				userMail : userEmail,
				originPhoto : result.uniqueFileName,
				bgPrompt : result.bgPrompt,
			};

			await this.uploadService.insertUser(userEmail);
			await this.uploadService.sendMessage(messageData);

			res.status(200).json({ message : 'Message sent successfully.' });
		} catch ( error ) {
			console.error(error);
			res.status(500).json({ error : 'An error occurred while sending the message.' });
		}
	};

	getUser = async ( req, res ) => {
		const userEmail = req.user.email;
		const userCheck = await this.uploadService.getUser(userEmail);
		res.send(userCheck);
	};

}

module.exports = UploadController;
