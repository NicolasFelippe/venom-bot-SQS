import { Consumer } from 'sqs-consumer';
import AWS from '../config/AWS.js';

export default class SqsConsumer {
  #client
  constructor(client) {
    this.#client = client
  }

  start() {
    const app = Consumer.create({
      queueUrl: process.env.QUEUE_URL,
      pollingWaitTimeMs: process.env.POLLING_WAIT_TIME_MS,
      messageAttributeNames: ['All'],
      sqs: new AWS.SQS(),
      handleMessage: async (message) => {
        try {
          console.log('message >>>', message.Body)
          const result = await this.#client
            .sendText(
              `${message.MessageAttributes.to.StringValue}@c.us`,
              message.Body)
  
          if (!result.erro) {
            const resultLocation = await this.#client
              .sendLocation(
                `${message.MessageAttributes.to.StringValue}@c.us`,
                message.MessageAttributes.latitude.StringValue,
                message.MessageAttributes.longitude.StringValue,
                message.MessageAttributes.from.StringValue)
  
            if (resultLocation.erro) {
              throw new Error("Erro ao enviar localização")
            }
          } else {
            throw new Error("Erro ao enviar mensagem")
          }
        } catch (error) {
          console.error('error', error)
          throw error
        }
      },
    });

    app.on('error', (err) => {
      console.error(err.message);
    });

    app.on('processing_error', (err) => {
      console.error(err.message);
    });

    app.on('timeout_error', (err) => {
      console.error(err.message);
    });

    app.start();
    console.info('SQS Consumer ON')
  }
}