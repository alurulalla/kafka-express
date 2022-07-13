const { Kafka } = require('kafkajs');
const eventType = require('./schema/productEventType');

const kafka = new Kafka({
  clientId: 'producer-app',
  brokers: ['localhost:9092'],
});

const sendMessageToTopic = async (product, topic) => {
  const producer = kafka.producer();

  await producer.connect();

  const encodedValue = eventType.toBuffer(product);

  await producer.send({
    topic,
    messages: [{ value: encodedValue }],
  });

  await producer.disconnect();
};

const readMessageFromTopic = async (topic, func) => {
  const consumer = kafka.consumer({ groupId: 'test-group-1' });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const decodedValue = eventType.fromBuffer(message.value);
      func(decodedValue);
    },
  });
};

module.exports = { sendMessageToTopic, readMessageFromTopic };
