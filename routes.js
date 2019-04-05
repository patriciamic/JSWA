module.exports = {
    getTest,
    postLogin,
    postNewUser,
    getUsers
}

const pool = require('./db');

function getTest(ctx) {
    ctx.body = "getTest";
}

async function getUsers(ctx) {
    //  ctx.body = await pool.executeQuery(`Select username from Users`);
    console.log(ctx.body);
}

async function postNewUser(ctx) {
    let mdata = ctx.request.body;
    let mdataUsernameString = JSON.stringify(mdata.username);
    let mdataPasswordString = JSON.stringify(mdata.username);
    if (mdataUsernameString.length < 4 || mdataPasswordString < 4) {
        return ctx.body = { message: `wrong` };
    }

    // let res = await pool.executeQuery(`INSERT INTO Users (username, password) VALUES ("${mdata.username}", "${mdata.password}")`);

    return ctx.body = { message: `${mdata.username}` };
}

async function postLogin(ctx) {
    let mdata = ctx.request.body;
    // let res = await pool.executeQuery(`select id, username from Users where username="${mdata.username}" and password = "${mdata.password}"`);
    //  let resStringfy = JSON.stringify(res);
    //  return ctx.body = { message: `${resStringfy}` };
    return ctx.body = { message: `${JSON.stringify(mdata.username)}` };
}