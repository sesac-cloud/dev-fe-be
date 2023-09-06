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
  })
  .catch((err) => {
    console.error(err);
  });


///////////////////////////////////////////////////////////////////
const authMiddleware = require('./middlewares/auth.middleware');

// app.get('/a',authMiddleware, async (req, res) =>
// {
// res.sendFile(path.join(__dirname + '/views/mygallery.html'));
// });


///////////////////////////////////////////////////////////////////



app.listen(env.PORT || 4000, () => {
	console.log(`Server running on http://localhost:${ env.PORT }`);
});
