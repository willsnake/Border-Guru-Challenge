const Router = require('koa-router');
const main = require('../controllers/main-controller');

// We configure the router to have the prefix of the user controller
const router = new Router({});

router.get('/', main.home);

module.exports = router;
