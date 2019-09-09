/**
 * Created by HTML on 2019/7/24
 */
    
    //系统模块
let http = require('http');
let url = require('url');
let ejs = require('ejs');


//路由:指的就是针对不同请求的URL，处理不同的业务逻辑
http.createServer(function (req, res) {
    //login 登录的一些功能  register 注册的功能
    // router.statics(req, res, 'static')
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
    let pathname = url.parse(req.url).pathname;
    
    if (pathname == '/login') {
        let data = '你好 我是后台数据';
        
        let list = [
            111, 222, 333
        ];
        //把数据库的数据渲染到模板上面
        
        ejs.renderFile('views/login.ejs', {
            msg: data,
            list
        }, function (err, data) {
            res.end(data);
        });
        
    } else if (pathname == '/register') {
        let msg = '这是注册页面，也是注册的路由';
        let h = "<h2>这是一个h2</h2>"
        ejs.renderFile('views/register.ejs', {
            msg,
            h
        }, function (err, data) {
            res.end(data);
        });
    } else {
        res.end('index');
    }
    
}).listen(8081);

