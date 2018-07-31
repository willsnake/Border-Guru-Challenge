const ItemModel = require('../models/item-model')();
const AddressModel = require('../models/address-model')();
const CustomerModel = require('../models/customer-model')();
const OrderModel = require('../models/order-model')();

// We create the variable that will contain all the functions from the controller
const controller = {};

controller.getCustomers = async ctx => {
    try {
        const {
            params: {
                id
            }
        } = ctx;

        const customers = await OrderModel.find({
            item: id
        }, 'customer')
        .populate('customer')

        ctx.status = 200;
        ctx.body = {
            customers
        };
    } catch (e) {
        ctx.throw(e);
    }
};

module.exports = controller;