// const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true"
// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/mydb');
// const mongoURI = "mongodb://localhost:27017/?directConnection=true"
// const mongoURI='mongodb://localhost:27017/Harry'
// const mongoURI = 'mongodb://localhost:27017/?directConnection=true';  


const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sankalpnaranje:h9hcK6nH1gnI93O8@cluster0.r3nw7lx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToMongo = async() => {
     mongoose.set('strictQuery', false);
  
    return mongoose.connect(mongoURI)
      .then(() => {
        console.log('Mongo connected successfully');
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
  };
module.exports = connectToMongo;





