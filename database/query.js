module.exports = {
    login,
    register,
    callInsertSubs,
    callDeleteSubs,
    allSubscribers,
    allFollowers,
    users,
    allPostsOfUser,
    allPostsNotUser,
    insertNewPost
}

function login(username, password, token) {
    return {
        text: 'select public."LoginUpdateToken"($1, $2, $3)',
        values: [username, password, token]
    }
}

function register(username, password) {
    return {
        text: 'INSERT INTO Users (username, password) VALUES ($1, $2)',
        values: [username, password]
    }
}

function callInsertSubs(idUserFrom, idUserTo) {
    return {
        text: 'select public."InsertSubs"($1, $2)',
        values: [idUserFrom, idUserTo]
    }
}

function callDeleteSubs(idUserFrom, idUserTo) {
    return {
        text: 'select public."DeleteSubs"($1, $2)',
        values: [idUserFrom, idUserTo]
    }
}


function allSubscribers(idUserFrom) {
    return {
        text: 'select public.users.username, public.subscribers."idUserTo" from public.subscribers join public.users on public.users.id = public.subscribers."idUserTo" where public.subscribers."idUserFrom" = $1',
        values: [idUserFrom]
    }
}

function allFollowers(idUserTo) {
    return {
        text: 'select public.users.username, public.subscribers."idUserTo" from public.subscribers join public.users on public.users.id = public.subscribers."idUserTo" where public.subscribers."idUserFrom" = $1',
        values: [idUserTo]
    }
}

function users() {
    return {
        text: 'select * from public.users',
        values: []
    }
}

function allPostsOfUser(idUser) {
    return {
        text: 'select "idUser", photo, description, code, "timeOfPost" from posts where "idUser"= $1',
        values: [idUser]
    }
}


function allPostsNotUser(idOfUser) {
    return {
        text: 'select username, "idUser", photo, description, "timeOfPost", code from posts join users on posts."idUser"= users.id where "idUser"!= $1 order by posts."timeOfPost" desc',
        values: [idOfUser]
    }
}

function insertNewPost(description, path, idUser, code) {
    return {
        text: 'INSERT INTO posts (description, photo, "idUser", code) VALUES ($1, $2, $3, $4)',
        values: [description, path, idUser, code]
    }
}