const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models');
require('dotenv').config({ path: './env/.env' });

const router = require('./routes/index');
const pageRouter = require('./routes/page');
const models = require('./models/index');

const app = express();
const env = process.env;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '/views')));

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/', router);
app.use('/', pageRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공!');
	  console.log();
	  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
	  console.log('PORT : ', env.PORT);
	  console.log('S3_BUCKET_NAME : ', env.AWS_S3_BUCKET_NAME);
	  console.log('RDS_USERNAME : ', env.AWS_RDS_USERNAME);
	  console.log('RDS_DATABASE: ', env.AWS_RDS_DATABASE);
	  console.log('RABBITMQ_USERNAME : ', env.AWS_RABBITMQ_USERNAME);
	  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-');
  })
  .catch((err) => {
    console.error(err);
  });


app.listen(env.PORT || 4000, () => {
	console.log(`Server running on http://localhost:${ env.PORT }`);
});
