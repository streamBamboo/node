/**
 * Created by HTML on 2019/8/6
 *
 *  npm install --save loa-session
 *
 *
 */
const Koa = require('koa'),
    router = require('koa-router')(), // 引入时实例化路由
    render = require('koa-art-template'),
    session = require('koa-session'),
    path = require('path');


//实例化
const app = new Koa();

//配置koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

//配置session的中间件
app.keys = ['some secret hurr']; // 相当于 cookie的签名

const CONFIG = {
    key: 'koa:sess', //默认
    maxAge: 86400000, // cookie的过期时间    【需要设置】
    overwrite: true, // 默认
    httpOnly: true, // true表示只有服务器端可以获取cookie
    signed: true, // 默认签名
    rolling: false, // 在每次请求时强行设置cookie，这将重置cookie的过期时间 默认false 【需要设置】
    renew: false, // 当快过期的时候重新设置cookie 【需要设置】
};

app.use(session(CONFIG, app));

router.get('/', async (ctx) => {
    //获取session
    console.log(ctx.session.userInfo);
    await ctx.render('index', {
        list: {
            name: '张三'
        }
    });
}).get('/login', async (ctx) => {
    // 设置session
    ctx.session.userInfo = '张三';
    ctx.body = '登录成功';
});

app.use(router.routes()).use(router.allowedMethods());// 启动路由


app.listen(3000);
