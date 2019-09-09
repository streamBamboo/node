/**
 * Created by HTML on 2019/7/17
 */
    //网络爬虫  爬某个网站首页所有的图片
    //需求：用node.js编写代码实现下载itsource.cn首页中所有的图片
    //开发思路：
    // 引入模块
var https = require('https');
var fs = require('fs');
var path = require('path');
//      1.使用http模块发起请求，获取到响应的数据
https.get('https://www.itsource.cn/', function (res) {
    var content = '';
    //通过响应对象，得到HTML数据
    res.on('data', function (str) {
        content += str;
    });
    
    res.on('end', function () {
        //      2.分析HTML数据，提取所有的图片地址
        //HTML代码存放在content中
        //. 特征是比配所有字符
        //* 这个字符出现多少次
        //?饥饿匹配
        var reg = /url\((.*?\.jpg)/img;
        var fileName;
        while (fileName = reg.exec(content)) {
            getImage(fileName[1]);
        }
    });
});

//编写函数实现获取图片，并将图片保存到硬盘上
function getImage (url) {
    var obj = path.parse(url);
    //问题: 由于图片在保存时，需要文件名，所以要先获取到图片的文件名
   
    var fn = obj.base;//获取到文件名
    var stream1 = fs.createWriteStream('./files/' + fn);
    //兼容网址里面没有根目录的情况
    if (obj.root.length === 0) {
        url = '/' + url;
    }
    
    //拼接成一个完整的图片URL，才能发起请求
    url = 'https://www.itsource.cn/' + url;
    
    //向服务器发起请求，获取图片
    https.get(url, function (res) {
        res.pipe(stream1);
        console.log(fn + '读取完毕!')
    });
}


//      3.根据图片地址再次发起请求，获取图片文件保存到硬盘中
