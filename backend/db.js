var mongoose = require("mongoose");
var config = require("./config");
const { MONGODB_URL: dbUrl } = config;
// const url =
//   "mongodb+srv://service_client:pDi28IFIfDk3XH75@cluster0.ahwpv.mongodb.net/rancholabs?retryWrites=true&w=majority&ssl=true` || 'mongodb://localhost/EKart";
const url =
  "mongodb://service_client:pDi28IFIfDk3XH75@cluster0-shard-00-00.ahwpv.mongodb.net:27017,cluster0-shard-00-01.ahwpv.mongodb.net:27017,cluster0-shard-00-02.ahwpv.mongodb.net:27017/rancholabs?ssl=true&replicaSet=atlas-tzdsmi-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected Successfully"))
    .catch((error) => console.log("Error:", error));
};

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
