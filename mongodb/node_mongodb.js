/**
 * Created by HTML on 2019/7/26
 */
/**
 * npm install mongodb --save  安装mongodb
 *
 * let MongoClient = require('mongodb').MongoClient;  引入mongodb的MongoClient
 *
 * let url = 'mongodb://localhost:27017/test';  连接数据库的地址
 *
 * 连接数据库
 *
 * MongoClient.connect(url, (err, db){
 *
 * });
 *
 * 实现增加修改删除
 * MongoClient.connect(url, (err, db) => {
 *      db.collection('user').insertOne({'name': 'zhangsan'}, (error, data) => {
 *
 *      })
 * });
 *
 *
 *
 *
 *
 *
 */

let http = require('http');
let ejs = require('ejs');
let MongoClient = require('mongodb').MongoClient; // 引入数据库 MongoClient

let dbUrl = 'mongodb://localhost:27017/'; // 连接数据库地址  stream表示数据库的名称

let url = require('url');
let app = require('./model/express-route.js');

http.createServer(app).listen(3000);

app.get('/', function (req, res) {
    let msg = '这是数据库的数据';
    ejs.renderFile('views/index.ejs', {msg: msg}, function (err, data) {
        res.send(data);
    });
    
});
let num = 0;
app.get('/add', (req, res) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => { // 连接数据库
        if (err) {
            console.log('数据库连接失败', err);
            return false;
        }
        num++;
        let dbo = db.db('runoob'); // rouoob 数据库名字
        //增加数据
        dbo.collection('site').insertOne({ // site 集合名
            name: 'zhangsan'+ num,
            age: 20
        }, (error, data) => {
            if (error) {
                console.log('增加数据失败', error);
                return false;
            }
            res.send('增加数据成功11q11');
            db.close();// 关闭数据库
        });
    });
});

//数据修改
app.get('/edit', (req, res) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            console.log('数据库连接失败', err);
            return;
        }
        
        let dbo = db.db('runoob');
        dbo.collection('site').updateOne({name: 'zhangsan'}, {
            $set: {
                age: 40
            }
        }, (error, data) => {
            if(error){
                console.log('修改数据失败');
                return;
            }
            console.log(data)
            res.send('修改数据成功');
            db.close();
        });
    });
});

//数据删除
app.get('/delete', (req, res) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            console.log('数据库连接失败', err);
            return;
        }
        console.log(req.url);
        let query = url.parse(req.url, true).query;
        console.log(query);
        let dbo = db.db('runoob');
        dbo.collection('site').deleteOne({name: query.name}, (error, data) => {
            if(error){
                console.log('删除数据失败');
                return;
            }
            res.send('删除数据成功');
            db.close();
        });
    });
});
