const mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://nithishj03:NOOB_master69@cluster0.1ygib2i.mongodb.net/roomzy'
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection;
connection.on('error', () => {
    console.log('MongoDB connection failed')
});
connection.on('connected', () => {
    console.log('MongoDB connection successful') }
);
module.exports = mongoose;