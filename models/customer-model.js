const { Schema } = require('mongoose');
const config = require('../config');
const db = require('../lib/mongoose').getConnection(config.mongo);

const schema = new Schema({
    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    addressId: {
        ref: 'Address',
        type: Schema.Types.ObjectId,
      },
}, {
    timestamps: true,
}, );

// We store the schema on the model on a variable
const Model = db.model('Customer', schema);

module.exports = () => Model;