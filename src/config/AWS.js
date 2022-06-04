import AWS from 'aws-sdk';
AWS.config.update({
  region: process.env.REGION_AWS,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

export default AWS
