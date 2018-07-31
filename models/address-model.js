const { Schema } = require('mongoose');
const config = require('../config');
const db = require('../lib/mongoose').getConnection(config.mongo);

const schema = new Schema({
    streetName: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}, );

// We store the schema on the model on a variable
const Model = db.model('Address', schema);

module.exports = () => Model;