const amqp = require('amqplib/callback_api');

let channel = null;
const MQ_URI = process.env.MQ_URI || 'amqp://localhost:5672';

amqp.connect(MQ_URI, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, ch) => {
        if (error1) {
            throw error1;
        }
        channel = ch;
    });
});

const publishToQueue = async (queueName, data) => {
    if (!channel) {
        throw new Error("Channel is not created yet");
    }
    channel.assertQueue(queueName, { durable: true });
    console.log(`${data.type} Queue is created`);
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
};

const consumeQueue = async (queueName, callback) => {
    if (!channel) {
        throw new Error("Channel is not created yet");
    }
    channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (msg) => {
        if (msg !== null) {
            callback(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        }
    });
};

module.exports = { publishToQueue, consumeQueue };
