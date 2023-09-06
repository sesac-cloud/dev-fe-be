const { cognitoClient } = require('../config/aws-config');

const AuthService = require('../services/auth.service');

class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	loginUser = async ( req, res ) => {
		const { username, password } = req.body;

		try {
			const tokens = await this.authService.authUser(username, password);
			if ( tokens ) {
				res.cookie('accessToken', tokens.accessToken);
				res.cookie('idToken', tokens.idToken);
				res.json({ success : true });
			} else {
				res.status(401).json({ success : false, message : 'Authentication failed' });
			}
		} catch ( error ) {
			console.error(error);
			res.status(500).json({ success : false, message : 'Internal server error' });
		}
	};


logoutUser = async (req, res) => {
  res.clearCookie('idToken');

  return res.status(200).json({ message: '로그아웃 성공' });
};
}

module.exports = AuthController;
