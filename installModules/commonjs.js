/**
 * Created by HTML on 2019/7/18
 */
    //npm i silly-datetime --save 安装第三方模块
    //注意：以后安装模块的时候要把这个模块写入到package.json这个配置文件
    // 安装模块  加入 --save  会把所安装的模块 写入 package.json里面
    //安装模块  加入 --save-dev  会把所安装的模块 写入 package.json里 的devDependencies 里面
    
    
    
    //package.json 里面的笔记
    // dependencies 和 devDependencies 的区别：
    // dependencies: 配置当前程序所依赖的其他包
    // devDependencies: 配置当前程序所依赖的其他包，只会下载模块，而不下载这些模块的测试和文档框架
    
    // 版本号前面的符号的意义
    // ^ 表示第一位版本号不变，后面两位取最新的
    // ~ 表示前两位不变，最后一个取最新
    // * 表示全部取最新
    
    
    
    //引入模块
var sd = require('silly-datetime');
var md5 = require('md5-node');
var http = require('http');

console.log(md5('123456'))

var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   
    // var d = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var d = sd.format(new Date(), 'YYYY-MM-DD');
    res.write('假的吧' + d);
    res.end();
});

app.listen(8083, '127.0.0.1');



