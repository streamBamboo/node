/**
 * Created by HTML on 2019/7/31
 */
/**
 *  npm install koa-views --save  安装 koa-views
 *  npm install ejs --save  安装 ejs
 *
 * app.use(views(_dirname, {extension: 'ejs'})) 配置模板引擎
 *
 * await ctx.render('index')
 *
 *  注意：我们需要在每一个路由的render里面都要渲染一个公共的数据
 *      公共的数据放在state里面，这样在模板的任何地方都可以使用
 *      state放在中间件里面
 *      ctx.state = {
 *          session: this.session,
 *          title: 'app',
 *      }
 *
 *
 *  //原生nodejs 在koa中获取表单提交的数据
 //接受post提交的数据
 router.post('/doAdd', async (ctx) => {
        //获取表单提交的数据
        let data = await common.getPostData(ctx);
        console.log(data);
        ctx.body = data;
    })
 
 
 用koa-bodyparser 获取表单提交的数据
 
 npm install --save koa-bodyparser 安装koa-bodyparser
 然后引入
 
 
 
 koa-static 静态资源中间件  静态web服务
 npm install --save koa-static
 */
const Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    bodyParser = require('koa-bodyparser'),
    static = require('koa-static'),
    common = require('./module/common'),
    ejs = require('ejs');


//实例化
const app = new Koa();
//配置模板引擎中间件  -- 第三方中间件
// app.use(views('views', {map: {html: 'ejs'}})); // 应用ejs模板引擎 这种配置需要后缀名是.html
app.use(views('views', {extension: 'ejs'})); // 应用ejs模板引擎  这种配置需要后缀名是.ejs

//配置post  bodyparser的中间件
app.use(bodyParser());

// 配置静态web服务的中间件---首先去static目录找，如果能找到则返回对应的文件，找不到就继续 next();
//可配置多个
// app.use(static('static'));
app.use(static(__dirname + 'static'));// __dirname == 当前目录


// 写一个中间件配置公共的信息
app.use(async (ctx, next) => {
    ctx.state = {
        userInfo: '张三',
    };
    await next(); // 这个不能漏掉  必须写
});


router.get('/', async (ctx) => {
    let title = '你好';
    
    // await 不写会报错
    await ctx.render('index', {
        title
    });
}).get('/news', async (ctx) => {
    let arr = [111111, 2222222, 333333, 444444];
    let content = '<h2>这是一个h2</h2>';
    await ctx.render('news', {
        arr,
        content
    });
});


//接受post提交的数据
router.post('/doAdd', async (ctx) => {
    //获取表单提交的数据
    //原生nodejs 在koa中获取表单提交的数据
   /* let data = await common.getPostData(ctx);
    console.log(data);
    ctx.body = data;*/
    
    //koa-bodyparser 在koa中获取表单提交的数据
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});

app.use(router.routes()) // 启动路由
    .use(router.allowedMethods());//可以配置也可以不配置，建议配置


app.listen(3000);
