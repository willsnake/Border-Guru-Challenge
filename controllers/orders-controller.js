const ItemModel = require('../models/item-model')();
const CustomerModel = require('../models/customer-model')();
const AddressModel = require('../models/address-model')();
const OrderModel = require('../models/order-model')();

// We create the variable that will contain all the functions from the controller
const controller = {};

controller.getOrdersFromCustomer = async ctx => {
    try {
        const {
            idCustomer
        } = ctx.params;

        const orders = await OrderModel.find({
                customer: idCustomer
            }).populate('customer')
            .populate('customerAdress')
            .populate('item')
        ctx.status = 200;
        ctx.body = {
            orders
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.getOrdersFromAddress = async ctx => {
    try {
        const {
            idAddress
        } = ctx.params;

        const orders = await OrderModel.find({
                customerAddress: idAddress
            }).populate('customer')
            .populate('customerAdress')
            .populate('item')
        ctx.status = 200;
        ctx.body = {
            orders
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.createNewOrder = async ctx => {
    try {
        const {
            request: {
                body: {
                    customer,
                    customerAddress,
                    item,
                    price,
                    currency
                }
            }
        } = ctx;

        const order = await OrderModel.create({
            customer,
            customerAddress,
            addressId: customerAddress,
            item,
            price,
            currency
        });

        ctx.status = 200;
        ctx.body = {
            order
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.updateOrder = async ctx => {
    try {
        const {
            params: {
                id
            },
            request: {
                body: {
                    customer,
                    customerAddress,
                    item,
                    price,
                    currency
                }
            }
        } = ctx;

        const order = await OrderModel.findByIdAndUpdate(id, {
            customer,
            customerAddress,
            addressId: customerAddress,
            item,
            price,
            currency
        });

        ctx.status = 200;
        ctx.body = {
            order
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.deleteOrder = async ctx => {
    try {
        const {
            params: {
                id
            }
        } = ctx;

        await OrderModel.findByIdAndRemove(id);

        ctx.status = 200;
        ctx.body = {};
    } catch (e) {
        ctx.throw(e);
    }
};

controller.getAmountFromOrder = async ctx => {
    try {
        const {
            params: {
                id
            }
        } = ctx;

        const amount = await OrderModel.findById(id, 'price');

        ctx.status = 200;
        ctx.body = {
            amount: amount.price
        };
    } catch (e) {
        ctx.throw(e);
    }
};

controller.getReport = async ctx => {
    try {

        const orders = await OrderModel.aggregate([{
            $sortByCount: "$item"
        }, ]).then(async res => {
            return res.map(async value => {
                const item = await ItemModel.findById(value._id);
                return { 
                    ...item,
                    count: value.count
                };
            })
        });

        ctx.status = 200;
        ctx.body = {
            orders
        };
    } catch (e) {
        ctx.throw(e);
    }
};

module.exports = controller;