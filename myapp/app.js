var http = require('http');
var fs = require('fs');
var path = require('path');

var myServer = http.createServer(function (req, res) {
    var myUrl = req.url == '/' ? 'index.html' : req.url;
    
    var mypath = path.join('view', myUrl);
    
    var html = '';
    if (fs.existsSync(mypath)) {
      html = fs.readFileSync(mypath);
    } else {
      var errPath = path.join('view', 'error.html');
      html = fs.readFileSync(errPath);
      
    }
    res.write(html);
    res.end();
  })
;

myServer.listen('3000', function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('服务器已开启，端口号为：3000');
});
