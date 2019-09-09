/**
 * Created by HTML on 2019/7/18
 */

var http = require('http');
// var config = require('./config.js');
var tools = require('./tools');
// foo 在根目录不存在，去node_modules，找到了foo.js  所以能直接require foo
var foo = require('foo');
// nav 在根目录不存在，去node_modules，找到了nav文件，nav文件夹下面有package.json，package.json里面的'main':'nav.js'是入口文件，所以能直接require nav
//package.json 生成的方法 :  在需要package.json的文件下面运行 npm init --yes
var nav = require('nav');
console.log(foo);
var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write('假的吧');
    console.log(tools.add(1, 2));
    
    res.end();
});

app.listen(8082, '127.0.0.1');



