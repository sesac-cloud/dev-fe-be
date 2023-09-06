const env = process.env;

const rabbitmqConfig = {
  // Error : Frame size exceeds frame max -> amqp에 s 추가하니까 해결.
  protocol: 'amqps',

  // RabbitMQ 인스턴스의 엔드포인트
  hostname: env.AWS_RABBITMQ_HOSTNAME,

   // RabbitMQ 사용자 이름
  username: env.AWS_RABBITMQ_USERNAME,

  // RabbitMQ 비밀번호
  password: env.AWS_RABBITMQ_PASSWORD,

  // 기본 RabbitMQ 포트 , 달라질수있음
  port: 5671,
  vhost: '/',
};

module.exports = rabbitmqConfig;