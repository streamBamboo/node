/**
 * Created by HTML on 2019/7/24
 */
    
    //系统模块
let http = require('http');
let url = require('url');

let model = require('./model/model');

//路由:指的就是针对不同请求的URL，处理不同的业务逻辑
http.createServer(function (req, res) {
    
    res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
    let pathname = url.parse(req.url, true).pathname.replace('/', '');
    
    if(pathname != 'favicon.ico'){
        try {
            model[pathname](req, res);
        }catch(err){
            model['home'](req, res);
        }
    }
}).listen(8081);

