const { connect, connection } = require('mongoose');
connect('mongodb://174.115.212.141/SocialNetworkDB',{
useNewUrlParser: true,
useUnifiedTopology: true,
});

module.exports = connection;