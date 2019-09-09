/**
 * Created by HTML on 2019/7/30
 */
const Koa = require('koa');
const Router = require('koa-router');


//实例化
const app = new Koa();
const router = new Router();


//配置路由
/**
 * cxt 上下文 context,包含了request和response等信息
 */
router.get('/', async (ctx) => {
    ctx.body = '首页'; //返回数据
}).get('/news', async (ctx) => {
    ctx.body = '这是一个新闻页面';
});


//中间件

//express写法
/*app.use(function (req, res) {
 res.send('返回数据');
 });*/

//koa 写法
//启动路由


app.use(router.routes()) // 启动路由
    .use(router.allowedMethods());//可以配置也可以不配置，建议配置

/*
 *
 *  router.allowedMethods()作用：这是官方文档的推荐用法，我们可以看到 router.allowedMethods()用在
 *  了路由匹配router.routes()之后，所以在当所有路由中间件最后调用，此时根据ctx.status设置response
 *  响应头
 * */

app.listen(3000);
