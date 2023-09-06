const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const jwtDecode = require('jwt-decode');
const { cognitoClient } = require('../config/aws-config');

const poolData = {
	UserPoolId : process.env.AWS_COGNITO_USER_POOL_ID,
	ClientId : process.env.AWS_COGNITO_CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class AuthService {

	authUser = async ( username, password ) => {
		const authenticationData = { Username : username, Password : password };
		const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
		const userData = { Username : username, Pool : userPool };
		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

		return new Promise(( resolve, reject ) => {
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess : ( session ) => {
					const accessToken = session.getAccessToken().getJwtToken();
					const idToken = session.getIdToken().getJwtToken();
					const idTokenDecoded = jwtDecode(idToken);

					const email = idTokenDecoded.email || '';
					const nickname = idTokenDecoded.nickname || '';

					resolve({ accessToken, idToken, email, nickname });
				},
				onFailure : ( err ) => {
					console.error('authentication failed', err);
					reject(err);
				}
			});
		});
	};
}


module.exports = AuthService;

