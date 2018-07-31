const { Schema } = require('mongoose');
const config = require('../config');
const db = require('../lib/mongoose').getConnection(config.mongo);

const schema = new Schema({
    customer: {
        ref: 'Customer',
        type: Schema.Types.ObjectId,
    },
    customerAddress: {
        ref: 'Address',
        type: Schema.Types.ObjectId,
    },
    item: {
        ref: 'Item',
        type: Schema.Types.ObjectId,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}, );

// We store the schema on the model on a variable
const Model = db.model('Order', schema);

module.exports = () => Model;