const joi = require('joi');
const Router = require('koa-router');
const customer = require('../controllers/customer-controller');
const validate = require('../middlewares/validate');

// We configure the router to have the prefix of the user controller
const router = new Router({
    prefix: '/customers',
});

router.get(
    '/info/:id',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        },
    }),
    customer.getInfoFromCustomer);

router.put(
    '/info/:id',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        },
        body: {
            email: joi.string().email(),
            firstName: joi.string(),
            lastName: joi.string(),
            addressId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        }
    }),
    customer.updateInfoFromCustomer);

router.delete(
    '/info/:id',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }
    }),
    customer.deleteInfoFromCustomer);

router.get(
    '/:id/orders',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }
    }),
    customer.getOrdersFromCustomer);

module.exports = router;