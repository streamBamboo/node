/**
 * Created by HTML on 2019/7/19
 */
    //系统模块
let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
let events = require('events');
console.log(events);
let EventEmitter = new events.EventEmitter();
console.log('EventsEitter', EventEmitter);

class MyEmitter extends events {}

let myEmitter = new MyEmitter();
console.log(myEmitter);
//自定义模块
let mimeModel = require('./model/getmimefromfile_events');

http.createServer(function (req, res) {
    //获取文件后缀名，但后面带有参数就需要用url.parse 来获取，
    // 通过url.parse能够单独获取带有后缀名的字段，过滤掉后面带有的参数
    let pathName = url.parse(req.url).pathname;
    
    if (pathName == '/') {
        pathName = '/index.html';//默认加载首页
    }
    
    //获取文件后缀名
    let extname = path.extname(pathName);
    
    //过滤无效的请求
    if (pathName != '/favicon.ico') {
        //文件操作获取 static下面的index.html
        fs.readFile('static/' + pathName, function (err, data) {
            if (err) {
                fs.readFile('static/404.html', function (err404, data404) {
                    res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'});
                    res.write(data404);
                    res.end();// 响应结束
                    
                });
                return false;
            } else {
                mimeModel.getMime(fs, EventEmitter, extname);
                EventEmitter.on('event', function (mime) {
                    res.writeHead(200, {'Content-Type': mime + ';charset="utf-8"'});
                    // res.write(data);
                    res.end(data);// 响应结束
                });
                
            }
            
        });
    }
    
}).listen(8085);

