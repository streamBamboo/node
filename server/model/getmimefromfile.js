/**
 * Created by HTML on 2019/7/19
 */
//获取后缀名的方法
exports.getMime = function (fs, extname) {
    //异步  拿到数据的顺序不对
    /*fs.readFile('./mime.json', function (err, data) {
     if (err) {
     console.log(err);
     return false;
     }
     
     let Mimes = JSON.parse(data.toString());
     return Mimes[extname] || 'text/html';
     });*/
    
    //同步
    let data = fs.readFileSync('./mime.json');
    let Mimes = JSON.parse(data.toString());
    return Mimes[extname] || 'text/html';
};
