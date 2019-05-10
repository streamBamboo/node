// 引入 http模块
var http = require('http');
var fs = require('fs');
var url = require('url');

//创建留言数据对象
var msgs = [
  {name: '张三', content: '你好我是张三', create_at: '2017-11-2 17:11:22'},
  {name: '李四', content: '你好我是李四', create_at: '2017-11-2 17:11:22'},
  {name: '王五', content: '你好我是王五', create_at: '2017-11-2 17:11:22'},
];


//创建web 服务器
var server = http.createServer();
//监听用户请求
server.on('request', function (req, res) {
  res.setHeader('content-type', 'text/html;charset=utf-8');
  //获取当前请求地址
  var currentUrl = req.url;
  //判断页面
  if (currentUrl == '/') {//首页  fs模块
    fs.readFile('./view/index.html', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      //res.end(data);//data中是首页所有的HTML代码   需求里面的列表动态化
      //将上面的变量数据 组装HTML
      var html = '';
      msgs.forEach(function (item) {
        console.log(item);
        html += `<li class="list-group-item">${item.name}说：${item.content} <span class="pull-right">${item.create_at}</span></li>`;
      });
      
      //将拼接好的数据  替换  data中的  111
      var htmls = data.replace('111', html);
      
      //响应替换后的数据即可
      res.end(htmls);
    });
  } else if (currentUrl == '/add') {//添加页
    fs.readFile('./view/add.html', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.end(data);
      
    });
  } else if (currentUrl.indexOf('/doadd') === 0) {
    // res.end('提交数据处理');
    
    //get 提交   /doadd?name=xxx&content=xxx   req.url 请求路径  得用URL模块
    
    var paramsObj = url.parse(req.url, true);
    //理论上是给数据库添加一条数据
    //现在是想数组中插入一条数据
    var data = new Date();
    var date = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate();
    var msg = {
      name: paramsObj.query.name,
      content: paramsObj.query.content,
      create_at: date
    };
    msgs.push(msg);
    
    //插入成功后跳转到首页
    res.statusCode = 302;// 重定向
    res.setHeader('location', '/');
    res.end();
  } else {//404
    fs.readFile('./view/error.html', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.end(data);
    });
  }
  // res.end('ok');
});
//启动服务
server.listen(8080, function () {
  console.log('启动成功');
});
