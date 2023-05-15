const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://musadaq23:Lebronmu27@socialnetworkdb.eturaox.mongodb.net/test?retryWrites=true&w=majority', {
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