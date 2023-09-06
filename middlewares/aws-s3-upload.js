// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const s3 = require('../config/aws-config');
//
// const uploadImage = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     key: (req, file, callback) => {
//       const userEmail = req.user.email; // 이메일 정보는 authMiddleware에서 저장됨
//       const uniqueFileName = Date.now() + '-' + userEmail + '-' + file.originalname;
//       callback(null, uniqueFileName);
//     },
//   }),
//   fileFilter: (req, file, callback) => {
//     if (file.mimetype.startsWith('image/')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Invalid file type'));
//     }
//   },
// });
//
// module.exports = uploadImage;
//
