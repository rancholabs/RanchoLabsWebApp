module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}?retryWrites=true&w=majority` || 'mongodb://localhost/EKart',
  //MONGODB_URL: "mongodb://localhost/rancholabs",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  GCLIENT_ID: process.env.GCLIENT_ID || "GoogleClientId",
  FB_TOKEN: process.env.FB_TOKEN || "FacebookToken",
  RAZOR_PAY_KEY_ID: process.env.RAZOR_PAY_KEY_ID || "accessKeyId",
  RAZOR_PAY_KEY_SECRET: process.env.RAZOR_PAY_KEY_SECRET || "secretAccessKey",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || "AwsS3Bucket",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "AwsAccessKeyId",
  AWS_SECRET_ACCESS_KEY:
    process.env.AWS_SECRET_ACCESS_KEY || "AwsSecretAccessKey",
  HOST: process.env.HOST || "http://localhost:5000",
  /*MAIL: {
      host: process.env.mail.host,
      auth: {
        user: process.env.mail.auth.user,
        pass: process.env.mail.auth.pass
      }
    }*/
  MAIL: {
    host: "smtp.gmail.com",
    auth: {
      user: "rancho.webd@gmail.com",
      pass: "rancho@@9137",
    },
  },
};
