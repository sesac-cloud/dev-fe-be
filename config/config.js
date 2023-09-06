require('dotenv').config();
const env = process.env;

const development = {
    username: env.AWS_RDS_USERNAME,
    password: env.AWS_RDS_PASSWORD,
    database: env.AWS_RDS_DATABASE,
    host: env.AWS_RDS_HOST,
    dialect: 'mysql',
    timezone: 'Asia/Seoul',
};

const test = {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
};

const production = {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
};


module.exports = { development, test, production }