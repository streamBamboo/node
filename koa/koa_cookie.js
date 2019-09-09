/**
 * Created by HTML on 2019/8/6
 *
 *  1、cookie 保存在浏览器客户端
 *  2、可以让我们用同一个浏览器访问同一个域名的时候共享数据
 *
 *
 *  ①、保存用户信息
 *  ②、浏览器历史记录
 *  ③、猜你喜欢的功能
 *  ④、10天免登陆
 *  ⑤、多个页面之间的数据传递
 *  ⑥、cookie实现购物车功能
 *
 *
 *  cookie 存汉字要先转base64
 *
 *  let userInfo = new Buffer('张三').toString(''base64)
 *  ctx.cookies.set('username', userInfo, {
        maxAge: 60 * 1000 * 60
    });
 *
 *  cookie 拿汉字
 *  let username = ctx.cookies.get('username')
 *  let userInfo = new Buffer(username, 'base64').toString()
 *
 *
 */
const Koa = require('koa'),
    router = require('koa-router')(), // 引入时实例化路由
    render = require('koa-art-template'),
    path = require('path');


//实例化
const app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

router.get('/', async (ctx) => {
    ctx.cookies.set('username', 'Zhangsan', {
        maxAge: 60 * 1000 * 60
    });
    let list = {
        name: '张三1111'
    };
    await ctx.render('news', {
        list
    });
}).get('/news', async (ctx) => {
    let username = ctx.cookies.get('username');
    let list = {
        name: '张三2222'
    };
    await ctx.render('news', {
        list
    });
}).get('/newscontent', async (ctx) => {
    ctx.body = '新闻详情';
});

app.use(router.routes()).use(router.allowedMethods());// 启动路由


app.listen(3000);
