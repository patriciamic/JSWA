const base64Img = require('base64-img');
const uuid = require('uuid/v1');
var fs = require("fs");
const pool = require('./db');

var fcm = require('fcm-notification');
var FCM = new fcm('fcm.json');


module.exports = {
    getTest,
    postLogin,
    postNewUser,
    getUsers,
    postPhoto,
    getLatestPhoto,
    getAllPosts,
    postNewSubscriber,
    postDeleteUser,
    getAllSubribers,
    getAllFollowers,
    test
}


let latestPhoto = "empty";
let latestDescription = "empty";

function getTest(ctx) {
    ctx.body = "getTest";
}

async function postNewSubscriber(ctx) {
    let mdata = ctx.request.body;
    //let res = await pool.executeQuery(`INSERT INTO subscribers (idUserFrom, idUserTo) VALUES ("${mdata.idUserFrom}", "${mdata.idUserTo}")`);
    let res = await pool.executeQuery(`call InsertSubs(${mdata.idUserFrom}, ${mdata.idUserTo})`);
    console.log(res[0]);
    ctx.body = res[0];
}

async function postDeleteUser(ctx) {
    let mdata = ctx.request.body;
    let res = await pool.executeQuery(`call DeleteSubs(${mdata.idUserFrom}, ${mdata.idUserTo})`);
    ctx.body = res[0];
}

async function getAllSubribers(ctx) {
    let mdata = ctx.request.body;
    console.log(mdata.idUserFrom);
    let res = await pool.executeQuery(`select users.username, subscribers.idUserTo from subscribers join users on users.id = subscribers.idUserTo where subscribers.idUserFrom = "${mdata.idUserFrom}"`);
    ctx.body = res;

    // ctx.body = { message: JSON.stringify(res) };

}

async function getAllFollowers(ctx) {
    let mdata = ctx.request.body;
    console.log(mdata.idUserTo);
    let res = await pool.executeQuery(`select users.username, subscribers.idUserFrom from subscribers join users on users.id = subscribers.idUserTo where subscribers.idUserTo = "${mdata.idUserTo}"`);
    ctx.body = res;
}


async function getUsers(ctx) {
    ctx.body = await pool.executeQuery(`Select username from Users`);
    console.log(ctx.body);
}

async function getLatestPhoto(ctx) {
    let mdata = ctx.request.body;
    console.log("body " + ctx.request.body.idUser);
    console.log(mdata.idUser);
    let res = await pool.executeQuery("select idUser, photo, description, code, timeOfPost from posts where idUser=" + mdata.idUser);
    let resStringfy = JSON.stringify(res);
    console.log(resStringfy);
    ctx.body = { message: `${resStringfy}` };

    // ctx.body = { photo: latestPhoto, description: latestDescription };

}


async function getAllPosts(ctx) {
    let mdata = ctx.request.body;
    let res = await pool.executeQuery("select username, idUser, photo, description, timeOfPost, code from posts join users on posts.idUser= users.id where idUser!=" + mdata.idUser + " order by posts.timeOfPost desc");
    let resStringfy = JSON.stringify(res);
    console.log(resStringfy);
    ctx.body = { message: `${resStringfy}` };
}

async function postNewUser(ctx) {
    let mdata = ctx.request.body;
    let mdataUsernameString = JSON.stringify(mdata.username);
    let mdataPasswordString = JSON.stringify(mdata.username);
    console.log(mdataUsernameString.length);
    if (mdataUsernameString.length < 4 || mdataPasswordString.length < 4) {
        console.log("intra cici");
        ctx.body = { message: `wrong` };
    } else {
        let res = await pool.executeQuery(`INSERT INTO Users (username, password) VALUES ("${mdata.username}", "${mdata.password}")`);
        ctx.body = { message: `${mdata.username}` };
    }

}

async function postLogin(ctx) {
    let mdata = ctx.request.body;
    let res = await pool.executeQuery(`select id, username from Users where username="${mdata.username}" and password = "${mdata.password}"`);
    let resStringfy = JSON.stringify(res);

    var message = {
        notification: {
            title: 'You are logged in as',
            body: `${mdata.username}`
        },
        token: 'fJYBZXxXQkc:APA91bFnsqWL6aeKvBo-2zGfcQP3yWV1GNV3w6fYT3x-FoD02wmmgMVremdeLDseWve293WOkrsDZbleiNoJ9Dd8lK-g-BQWYy7T6z9iuHH_8TT31Pir87CyO2ogJ4i8rqT7Y7UXGRNk'
    };

    FCM.send(message, (err, res) => {
        if (err) console.log(err);
        console.log(res);
        ctx.body = res;
    });

    ctx.body = { message: `${resStringfy}` };

    // ctx.body = { message: `${JSON.stringify(mdata.username)}` };
}

async function postPhoto(ctx) {
    ctx.body = await writeImage(ctx.request.body.idUser, ctx.request.body.image.substring(1, ctx.request.body.image.length - 1), ctx.request.body.description, ctx.request.body.code);
}

async function test(ctx) {
    var message = {
        notification: {
            title: 'Title of notification',
            body: 'Body of notification'
        },
        token: 'fJYBZXxXQkc:APA91bFnsqWL6aeKvBo-2zGfcQP3yWV1GNV3w6fYT3x-FoD02wmmgMVremdeLDseWve293WOkrsDZbleiNoJ9Dd8lK-g-BQWYy7T6z9iuHH_8TT31Pir87CyO2ogJ4i8rqT7Y7UXGRNk'
    };

    FCM.send(message, (err, res) => {
        if (err) console.log(err);
        console.log(res);
        ctx.body = res;
    })
}

function writeImage(idUser, image, description, code) {

    return new Promise(async(res, rej) => {
        let path = uuid();
        latestPhoto = path;
        latestDescription = description;
        console.log("aici 1");
        base64Img.img(image, 'imagesPosts', path, async function(err, filepath) {
            if (err) { rej(err) }
            // await writeFile({ userID: idUser, image: filepath.substring(5), description: description });
            res('done');
        });
        console.log("aici 2");
        let result = await pool.executeQuery(`INSERT INTO posts (description, photo, idUser, code) VALUES ("${description}", "${path}", "${idUser}", "${code}")`);


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
        //console.log(q);
        q.push({ image: data.image, description: data.description });

        //console.log(q);

        fs.writeFile('./object.json', JSON.stringify(q), (err, w) => {
            if (err) rej(err);
            res(w);
        })
    })
}