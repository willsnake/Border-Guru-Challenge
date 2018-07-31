const ItemModel = require('../models/item-model')();
const AddressModel = require('../models/address-model')();
const OrderModel = require('../models/order-model')();
const CustomerModel = require('../models/customer-model')();

// We create the variable that will contain all the functions from the controller
const controller = {};

controller.getInfoFromCustomer = async ctx => {
    try {
        const {
            params: {
                id
            }
        } = ctx;

        const customer = await CustomerModel.findById(id)

        ctx.status = 200;
        ctx.body = {
            customer
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.updateInfoFromCustomer = async ctx => {
    try {
        const {
            params: {
                id
            },
            request: {
                body: {
                    email,
                    firstName,
                    lastName,
                    addressId,
                }
            }
        } = ctx;

        const customer = await CustomerModel.findByIdAndUpdate(id, {
            email,
            firstName,
            lastName,
            addressId,
        })

        ctx.status = 200;
        ctx.body = {
            customer
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.deleteInfoFromCustomer = async ctx => {
    try {
        const {
            params: {
                id
            }
        } = ctx;

        await CustomerModel.findByIdAndRemove(id);

        ctx.status = 200;
        ctx.body = {};
    } catch (e) {
        ctx.throw(e);
    }
};

controller.getOrdersFromCustomer = async ctx => {
    try {
        const {
            params: {
                id
            }
        } = ctx;

        const orders = await OrderModel.find({
            customer: id
        })

        ctx.status = 200;
        ctx.body = {
            orders
        };
    } catch (e) {
        ctx.throw(e);
    }
};

module.exports = controller;