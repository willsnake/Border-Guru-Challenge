const joi = require('joi');
const Router = require('koa-router');
const orders = require('../controllers/orders-controller');
const validate = require('../middlewares/validate');

// We configure the router to have the prefix of the user controller
const router = new Router({
    prefix: '/orders',
});

router.get(
    '/user/:idCustomer',
    validate({
        params: {
            idCustomer: joi.string().alphanum().min(24).max(24).required(),
        },
    }),
    orders.getOrdersFromCustomer);

router.get(
    '/address/:idAddress',
    validate({
        params: {
            idAddress: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        },
    }),
    orders.getOrdersFromAddress);

router.post(
    '/',
    validate({
        body: {
            customer: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            customerAddress: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            price: joi.number().required(),
            currency: joi.string().min(3).required(),
        },
    }),
    orders.createNewOrder);

router.put(
    '/:id',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        },
        body: {
            customer: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            customerAddress: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            price: joi.number().required(),
            currency: joi.string().min(3).max(3).required(),
        },
    }),
    orders.updateOrder);

router.delete(
    '/:id',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        },
    }),
    orders.deleteOrder);

router.get(
    '/:id/amount',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        },
    }),
    orders.getAmountFromOrder);

router.get(
    '/report',
    orders.getReport);


module.exports = router;