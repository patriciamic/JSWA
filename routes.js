module.exports = {
    getTest,
    postTest
}

const pool = require('./db');

function getTest(ctx) {
    ctx.body = 'getTest';
    console.log(ctx.body);
}

async function  postTest(ctx) {

    let mdata = JSON.parse(ctx.request.body.data);
    //ctx.body = {message: `Am primit ${res.username} , ${res.password}`}; 
    let res = await pool.executeQuery(`select id, username from Users where username="${mdata.username}" and password = "${mdata.password}"`);
       
    let resStringfy = JSON.stringify(res);
  //  if(resStringfy != '[]'){
   //     return ctx.body = {message: "ok"}
   // }

   // return ctx.body = {message: "0"}
   return ctx.body =  {message: `${resStringfy}`};
  // return ctx.body = pool.getConnection;
  
}