const Koa = require('koa');
const body = require('koa-bodyparser');
const router = require('koa-router')();
const serve = require('koa-static');
const send = require('koa-send');
const port = process.env.PORT || 3000;

const routes = require('./routes');

const app = new Koa();

//router.get('/getUsers', routes.getTest);
router.get('/getUsers', routes.getUsers);

router.post('/auth', routes.postLogin);

router.post('/newUser', routes.postNewUser);

app
    .use(serve('client')).use(body()).use(router.routes()).use(router.allowedMethods())
    .use(async(ctx) => {
        if (ctx.path === '/node_modules/angular-drop-image/dist/angular-drop-image.js') {
            await send(ctx, ctx.path);
        } else {
            ctx.throw(404);
        }
    });

app.listen(port, error => error ? console.error(error) : console.log(`Listen on ${port} port!`));

module.exports = {
    app
}