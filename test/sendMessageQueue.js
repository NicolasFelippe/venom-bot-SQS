import 'dotenv/config' 
import AWS from '../src/config/AWS.js'
import { v4 as uuidv4 } from 'uuid'

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2022-06-04' });

const params = {
  MessageGroupId: "Group1",
  MessageAttributes: {
    from: {
      DataType: "String",
      StringValue: "Studio Leo Barber"
    },
    to: {
      DataType: "String",
      StringValue: "5547997022014"
    },
    latitude: {
      DataType: "String",
      StringValue: "-26.2870314"
    },
    longitude: {
      DataType: "String",
      StringValue: "-48.9022126"
    }
  },
  MessageBody: "Boa tarde Junior! Você tem agenda daqui 1 hora no Studio Leo Barber com o profissional X",
  MessageDeduplicationId: uuidv4(),
  QueueUrl: "https://sqs.sa-east-1.amazonaws.com/069705372199/WhatsQueue.fifo"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});