/**
 * Created by HTML on 2019/7/19
 */
const fs = require('fs');
// 判断服务器上面有没有upload目录，没有创建这个目录

fs.stat('upload', function (err, stats) {
    if (err) {
        //没有就创建这个目录
        fs.mkdir('upload', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
            console.log('创建成功');
        });
        return false;
    } else {
        console.log('目录存在');
        console.log(stats.isDirectory());
    }
    
    
});


//找到fs目录下面的所有目录，然后打印出来
let filesArr = [];
fs.readdir('../fs', function (err, files) {
    if (err) {
        console.log(err);
    } else {
        //判断是目录还是文件夹
        console.log('files', files);
        //自执行函数
        (function getFile (i) {
            
            if (i == files.length) {
                console.log('filesArr', filesArr);
                return false;
            }
            //注意：文件目录
            fs.stat('../fs/' + files[i], function (error, stats) {
                if (stats.isDirectory()) {
                    filesArr.push(files[i]);
                }
                
                //递归调用
                getFile(i + 1);
            });
            
            
        })(0);
        
    }
});


//流的方式读取文件

let readStream = fs.createReadStream('input.txt');

let str = '';
let count = 0; //读取次数
readStream.on('data', function (chunk) {
    str += chunk;
    count++;
});

//读取完成
readStream.on('end', function () {
    console.log(str);
    console.log(count);
});

//读取失败
readStream.on('error', function (err) {
    console.log(err);
});


//创建一个可以写入的流，写入到文件output.txt中
let data = '我是从数据库获取的数据，我要保存起来\n';


let writeStream = fs.createWriteStream('output.txt');

for(let i = 0;i < 100; i++){
    writeStream.write(data, 'utf8');
}


//标记写入完成
writeStream.end();


//
writeStream.on('finish', function () {
    console.log('写入完成')
})

//失败
writeStream.on('error', function () {
    console.log('写入失败')
})


//管道流

//创建一个可读流
let readsStream = fs.createReadStream('input.txt');

//创建一个可写流
let writesStream = fs.createWriteStream('output.txt');

//管道流读写操作
//读取input.txt 文件内容,并将内容写入到 output.txt 文件中
readsStream.pipe(writesStream)
