/**
 * Created by HTML on 2019/7/23
 */

    //系统模块
let http = require('http');


//自定义模块
let router = require('./model/router');

http.createServer(function (req, res) {
    router.statics(req, res, 'static')

}).listen(8081);

