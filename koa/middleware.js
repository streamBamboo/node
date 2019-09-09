/**
 * Created by HTML on 2019/7/31
 */

const Koa = require('koa');
const router = require('koa-router')(); // 引入时实例化路由


//实例化
const app = new Koa();

//Koa 中间件  匹配任何路由 如果不写 next，这个路由被匹配到就不会继续向下匹配
// 例子：匹配路由之间打印当前日期
//应用级中间件
/*app.use(async (ctx, next) => {
 console.log(new Date());
 await next();/!*当前路由匹配完成以后继续向下匹配*!/
 });*/

// 错误处理中间件
/*app.use(async (ctx, next) => {
    console.log('这是一个中间件01');
    next();
    
    //如果页面不存在
    if (ctx.status == 404) {
        ctx.status = 404;
        ctx.body = '这是一个 404 页面';
    }else{
        console.log(ctx.url);
    }
});*/

//Koa中间件执行的顺序： 这是一个中间件01 => 这是一个中间件02 => 新闻页面2 => 2 => 1
app.use(async (ctx, next) => {
    console.log('这是一个中间件01');
    next();
    console.log(1);
});

app.use(async (ctx, next) => {
    console.log('这是一个中间件02');
    next();
    console.log(2);
});


/*router.get('/', async (ctx) => {
 ctx.body = '首页';
 }).get('/news', async (ctx) => {
 ctx.body = '新闻页面';
 }).get('/newscontent/:aid', async (ctx) => {
 //动态路由
 
 console.log(2, ctx.params); // 获取动态路由的返回值
 
 ctx.body = '新闻详情';
 });*/

router.get('/', async (ctx) => {
    ctx.body = '首页';
});
/*//路由中间件
 // 匹配到news路由以后继续向下匹配路由
 router.get('/news', async (ctx, next) => {
 
 console.log('新闻页面');
 await next();
 })
 router.get('/news', async (ctx) => {
 ctx.body = '新闻页面';
 })*/

router.get('/news', async (ctx, next) => {
    
    console.log('新闻页面2');
    ctx.body = '新闻页面';
});

router.get('/newscontent/:aid', async (ctx) => {
    //动态路由
    
    console.log(2, ctx.params); // 获取动态路由的返回值
    
    ctx.body = '新闻详情';
});



app.use(router.routes()).use(router.allowedMethods());// 启动路由


app.listen(3000);
