const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SocialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = connection;