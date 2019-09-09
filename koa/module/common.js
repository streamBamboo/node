/**
 * Created by HTML on 2019/8/6
 */


exports.getPostData = function(ctx){
    
    // 获取数据 异步
    return new Promise((resolve, reject) => {
        
        try {
            let str = '';
            ctx.req.on('data', (chunk) => {
                str += chunk
            })
    
            ctx.req.on('end', () => {
                resolve(str)
            })
        }catch(err){
            reject(err)
        }
        
    })
}


