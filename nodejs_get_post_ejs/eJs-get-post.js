/**
 * Created by HTML on 2019/7/24
 */
    
    //系统模块
let http = require('http');
let url = require('url');
let ejs = require('ejs');

let fs = require('fs');

//路由:指的就是针对不同请求的URL，处理不同的业务逻辑
http.createServer(function (req, res) {
    //login 登录的一些功能  register 注册的功能
    // router.statics(req, res, 'static')
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
    let pathname = url.parse(req.url, true).pathname;
    //拿到请求是get还是post
    console.log(req.method);
    
    let method = req.method.toLowerCase();
    
    if (pathname == '/login') { //显示登录页面
        
        ejs.renderFile('views/form.ejs', {}, function (err, data) {
            res.end(data);
        });
        
    } else if (pathname == '/doLogin' && method == 'get') {//执行登录的操作
        
        //get请求 拿前端传过来的数据的方法
        //url.parse(req.url, true).query
        
        res.end('doLogin');
        
    } else if (pathname == '/doLogin' && method == 'post') {//执行登录的操作
        
        //post请求 拿前端传过来的数据的方法
        var postStr = '';
        req.on('data', (chunk) => {
            postStr += chunk;
        });
        
        req.on('end', (err, chunk) => {
            console.log(postStr);
            
            fs.appendFile('login.txt', postStr, (err) => {
                if (err) {
                    console.log(err);
                    return false;
                }
                console.log('写入数据成功');
            });
            
            res.end('<script>alert("登陆成功");history.back();</script>');
        });
        
        
    } else {
        ejs.renderFile('views/index.ejs', {}, function (err, data) {
            res.end(data);
        });
    }
}).listen(8081);

