/**
 * Created by HTML on 2019/7/30
 *
 *
 * npm install --save art-template
 *
 * npm install --save koa-art-template
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
const Koa = require('koa'),
    router = require('koa-router')(), // 引入时实例化路由
    render = require('koa-art-template'),
    path = require('path'),
    artTemplate = require('art-template');


//实例化
const app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

router.get('/', async (ctx) => {
    await ctx.render('index')
}).get('/news', async (ctx) => {
    let list = {
        name: '张三'
    }
    await ctx.render('news', {
        list
    })
}).get('/newscontent', async (ctx) => {
    ctx.body = '新闻详情';
});

app.use(router.routes()).use(router.allowedMethods());// 启动路由


app.listen(3000);
