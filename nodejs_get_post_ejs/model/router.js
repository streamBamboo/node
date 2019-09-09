/**
 * Created by HTML on 2019/7/23
 */
let fs = require('fs');
let path = require('path');
let url = require('url');

//获取文件类型的私有方法
function getMime (extname, callback) {
    //异步  拿到数据的顺序不对
    fs.readFile('./mime.json', function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        
        let Mimes = JSON.parse(data.toString());
        let mime = Mimes[extname] || 'text/html';
        //这里 通过callback返回数据  不通过return返回
        callback(mime);
    });
}

//封装 获取文件 后缀名的方法 以便调用
exports.statics = function (req, res, staticspath) {
    let pathName = url.parse(req.url).pathname; //获取url的值
    
    if (pathName == '/') {
        pathName = '/index.html';//默认加载首页
    }
    
    //获取文件后缀名
    let extname = path.extname(pathName);
    
    //过滤无效的请求
    if (pathName != '/favicon.ico') {
        //文件操作获取 static下面的index.html
        fs.readFile(staticspath + '/' + pathName, function (err, data) {
            if (err) {
                fs.readFile(staticspath + '/404.html', function (err404, data404) {
                    res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'});
                    res.write(data404);
                    res.end();// 响应结束
                    
                });
                return false;
            } else {
                getMime(extname, function (mime) {
                    res.writeHead(200, {'Content-Type': mime + ';charset="utf-8"'});
                    res.write(data);
                    res.end();// 响应结束
                });
                
            }
            
        });
    }
};
