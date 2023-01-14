const mongoose = require('mongoose');
require('dotenv').config();
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mywork.1yihaoh.mongodb.net/?retryWrites=true&w=majority`;
const connection = mongoose
    .connect(uri, connectionParams)
    .then(() => console.log('Connected to cloud'))
    .catch((err) => console.log(err));

module.exports = connection;
