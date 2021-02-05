var mongoose = require('mongoose')
var config = require('./config');
const {MONGODB_URL: dbUrl} = config;
const url = "mongodb+srv://service_client:$client%40rancho@$cluster0.ahwpv.mongodb.net/rancholabs?retryWrites=true&w=majority` || 'mongodb://localhost/EKart"

module.exports.connect = () => {
    mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(()=> console.log('MongoDB connected Successfully'))
  .catch((error) => console.log('Error:',error));
}