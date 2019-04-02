const Koa = require('koa');
const body = require('koa-bodyparser');
const router = require('koa-router')();
const serve = require('koa-static');
const port = process.env.PORT || 3000;

const routes = require('./routes');

const app = new Koa();

//router.get('/getUsers', routes.getTest);
router.get('/getUsers', routes.getUsers);

router.post('/auth', routes.postLogin);

router.post('/newUser', routes.postNewUser);

app.use(serve('client')).use(body()).use(router.routes()).use(router.allowedMethods());

app.listen(port, error => error ? console.error(error) : console.log(`Listen on ${port} port!`));

module.exports = {
 app
}