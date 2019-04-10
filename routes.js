const base64Img = require('base64-img');
const uuid = require('uuid/v1');

module.exports = {
    getTest,
    postLogin,
    postNewUser,
    getUsers,
    postPhoto,
    getLatestPhoto
}

const pool = require('./db');
let latestPhoto = "empty";
let latestDescription = "empty";

function getTest(ctx) {
    ctx.body = "getTest";
}

async function getUsers(ctx) {
    //  ctx.body = await pool.executeQuery(`Select username from Users`);
    // console.log(ctx.body);
}

function getLatestPhoto(ctx) {

    console.log(ctx.request.body);

    ctx.body = { photo: latestPhoto, description: latestDescription };

}

async function postNewUser(ctx) {
    let mdata = ctx.request.body;
    let mdataUsernameString = JSON.stringify(mdata.username);
    let mdataPasswordString = JSON.stringify(mdata.username);
    if (mdataUsernameString.length < 4 || mdataPasswordString < 4) {
        ctx.body = { message: `wrong` };
    }

    // let res = await pool.executeQuery(`INSERT INTO Users (username, password) VALUES ("${mdata.username}", "${mdata.password}")`);

    ctx.body = { message: `${mdata.username}` };
}

async function postLogin(ctx) {
    let mdata = ctx.request.body;
    // let res = await pool.executeQuery(`select id, username from Users where username="${mdata.username}" and password = "${mdata.password}"`);
    //  let resStringfy = JSON.stringify(res);
    // ctx.body = { message: `${resStringfy}` };
    ctx.body = { message: `${JSON.stringify(mdata.username)}` };
}



var fs = require("fs");


async function postPhoto(ctx) {
    ctx.body = await writeImage(ctx.request.body.image.substring(1, ctx.request.body.image.length - 1), ctx.request.body.description);
}

function writeImage(image, description) {
    return new Promise(async(res, rej) => {
        let path = uuid();
        latestPhoto = path;
        latestDescription = description;
        base64Img.img(image, 'test', path, async function(err, filepath) {
            if (err) { rej(err) }
            await writeFile({ image: filepath.substring(5), description: description });
            res('done');
        });
    })
}

function readFile(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, (err, data) => {
            if (err) rej(err);
            res(data);
        })
    });
}

function writeFile(data) {
    return new Promise(async(res, rej) => {
        let q = JSON.parse(await readFile('./object.json'));
        console.log(q);
        q.push({ image: data.image, description: data.description });

        console.log(q);

        fs.writeFile('./object.json', JSON.stringify(q), (err, w) => {
            if (err) rej(err);
            res(w);
        })
    })
}