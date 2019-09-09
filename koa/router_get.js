/**
 * Created by HTML on 2019/7/30
 */
const Koa = require('koa');
const router = require('koa-router')(); // 引入时实例化路由


//实例化
const app = new Koa();

router.get('/', async (ctx) => {
    ctx.body = '首页';
}).get('/news', async (ctx) => {
    ctx.body = '新闻页面';
}).get('/newscontent', async (ctx) => {
    
    //获取get传值
    
    /*
    * 在koa2 中 GET 传值通过 request 接收，但是接收的方法有两种：query 和 querystring
    *
    *   query：返回的是格式化好的参数对象
    *   querystring：返回的是请求字符串
    *
    * */
    //从ctx中读取get传值
    console.log(2,ctx.query);  /*等于*/   console.log(3,ctx.request.query);
    
    console.log(3,ctx.querystring); /*等于*/ console.log(3,ctx.request.querystring);
    console.log(3,ctx.url);  /*等于*/ console.log(3,ctx.request.url);
    
    
    
    
    ctx.body = '新闻详情';
});

app.use(router.routes()).use(router.allowedMethods());// 启动路由


app.listen(3000);
