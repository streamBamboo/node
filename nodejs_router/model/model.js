/**
 * Created by HTML on 2019/7/24
 */

let ejs = require('ejs');
let fs = require('fs');

let app = {
    // login
    login (req, res) {
        console.log('login');
        // res.end('login');
        ejs.renderFile('views/form.ejs', {}, (err, data) => {
            res.end(data)
        })
    },
    doLogin(req, res){
        var postStr = '';
        req.on('data', (chunk) => {
            postStr += chunk;
        });
    
        req.on('end', (err, chunk) => {
            console.log(postStr);
        
            fs.appendFile('login.txt', postStr + '\n', (err) => {
                if (err) {
                    console.log(err);
                    return false;
                }
                console.log('写入数据成功');
            });
        
            res.end('<script>alert("登陆成功");history.back();</script>');
        });
    },
    register (req, res) {
        console.log('register');
        
    },
    home (req, res) {
        console.log('home');
        res.end('home');
    }
};


module.exports = app;
