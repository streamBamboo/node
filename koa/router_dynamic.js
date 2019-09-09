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
}).get('/newscontent/:aid', async (ctx) => {
    //动态路由
   
    console.log(2,ctx.params); // 获取动态路由的返回值
    
    ctx.body = '新闻详情';
});

app.use(router.routes()).use(router.allowedMethods());// 启动路由


app.listen(3000);
