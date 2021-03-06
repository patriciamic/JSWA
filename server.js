const Koa = require('koa');
const body = require('koa-bodyparser');
const router = require('koa-router')();
const serve = require('koa-static');
const send = require('koa-send');

const port = process.env.PORT || 3000;

const routes = require('./routes');

const app = new Koa();

router.get('/getUsers', routes.getUsers);

router.post('/allPostsById', routes.getAllPostsOfUser);

router.post('/allPosts', routes.getAllPosts);

router.post('/auth', routes.postLogin);

router.post('/newUser', routes.postNewUser);

router.post('/addNewPost', routes.postPhoto);

router.post('/addNewSubscriber', routes.postNewSubscriber);

router.post('/deleteSubscriber', routes.postDeleteSubscriber);

router.post('/allSubsribers', routes.getAllSubribers);

router.post('/allFollowers', routes.getAllFollowers);

router.post('/news', routes.getNews);

router.get('/test', routes.test);

app
    .use(serve('client'))
    .use(serve('imagesPosts'))
    .use(body()).use(router.routes()).use(router.allowedMethods())
    .use(async(ctx) => {
        if (ctx.path === '/node_modules/angular-drop-image/dist/angular-drop-image.js') {
            await send(ctx, ctx.path);
        } else if (ctx.path === '/node_modules/ngclipboard/dist/ngclipboard.min.js') {
            await send(ctx, ctx.path);
        } else {
            await send(ctx, 'client/index.html');
        }
    });

app.listen(port, error => error ? console.error(error) : console.log(`Listen on ${port} port!`));

module.exports = {
    app
}