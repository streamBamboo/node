// 引入index1模块

var b = require('./index1');
console.log(b)


//对象.属性名
//对象.方法名



//引入 官方模块（官方模块不需要定义）

var os = require('os');//主要用来获取操作系统信息
var path = require('path');//主要用来操作文件路径
var url = require('url');// 解析url模块

//需求
//获取系统总内存
console.log(os.totalmem());

//获取文件后缀
console.log(path.extname('c:app/view/goods/index.html'));

//获取表单get提交参数 http://itcast.cn?name=张三&age=18
console.log(url.parse('http://itcast.cn?name=张三&age=18', true));





