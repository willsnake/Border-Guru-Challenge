const { Schema } = require('mongoose');
const config = require('../config');
const db = require('../lib/mongoose').getConnection(config.mongo);

const schema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
}, );

// We store the schema on the model on a variable
const Model = db.model('Item', schema);

module.exports = () => Model;