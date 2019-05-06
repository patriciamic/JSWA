module.exports = {
    login,
    register
}

function login(username, password) {
    return {
        text: 'select id, username from public.users where username = $1 and password = $2',
        values: [username, password]
    }
}

function register(username, password) {
    return {
        text: 'INSERT INTO Users (username, password) VALUES ($1, $2)',
        values: [username, password]
    }
}