/**
 * Created by HTML on 2019/7/19
 */

//获取后缀名的方法
exports.getMime = function (extname) {
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
       default :
            return 'text/html';
    }
};
