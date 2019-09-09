/**
 * Created by HTML on 2019/7/23
 */
    
    //系统模块
let http = require('http');
let url = require('url');


//路由
http.createServer(function (req, res) {
    //login 登录的一些功能  register 注册的功能
    // router.statics(req, res, 'static')
    
    let pathname = url.parse(req.url).pathname;
    
    if(pathname == '/login'){
        res.end('login')
    }else if(pathname == '/register'){
        res.end('register')
    }else if(pathname == '/order'){
        res.end('order')
    }else{
        res.end('index')
    }
    
}).listen(8081);
