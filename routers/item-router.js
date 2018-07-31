const joi = require('joi');
const Router = require('koa-router');
const customer = require('../controllers/item-controller');
const validate = require('../middlewares/validate');

// We configure the router to have the prefix of the user controller
const router = new Router({
    prefix: '/items',
});

router.get(
    '/:id/customers',
    validate({
        params: {
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        },
    }),
    customer.getCustomers);

module.exports = router;