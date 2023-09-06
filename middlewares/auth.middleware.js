const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

// Create a JWKS client to fetch the public keys from AWS Cognito
const jwksClientInstance = jwksClient({
  jwksUri: process.env.AWS_COGNITO_JWKS_URI,
});

module.exports = (req, res, next) => {
  const accessToken = req.cookies.idToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  // Get the JWT header to extract the kid (Key ID)
  const decodedHeader = jwt.decode(accessToken, { complete: true });
  if (!decodedHeader || !decodedHeader.header || !decodedHeader.header.kid) {
    return res.status(401).json({ message: 'Invalid access token header' });
  }

  const kid = decodedHeader.header.kid;

  // Fetch the public key using kid from JWT header
  jwksClientInstance.getSigningKey(kid, (error, key) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching JWKS keys' });
    }

    // Verify the JWT token using the fetched public key
    const publicKey = key.publicKey || key.rsaPublicKey;
    jwt.verify(accessToken, publicKey, (verifyError, decoded) => {
      if (verifyError) {
        return res.status(401).json({ message: 'Invalid access token' });
      }

      req.user = decoded;
      next();
    });
  });
};
