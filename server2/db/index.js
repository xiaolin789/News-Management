const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'users',
});

module.exports = pool



// module.exports = function(sql){

//     return new Promise((resolve,reject)=>{
//         pool.query(sql,(err,rows)=>{
//             if(err){
//                 reject(err)
//             }
//             resolve(rows)
//         })

//     })
// }


// connection.connect(function(err){
//     if(err) {
//         console.log('cuo');
//         return
//     }
//     console.log('dui');
// })

// var sql = 'select * from user'

// connection.query(sql,(err,result) =>{
//     if(err) throw err
//     console.log(result);
// })