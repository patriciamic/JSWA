

// let dataUser;
// function getData() {
//     $.get('http://192.168.101.199:3000/getUsers', data => console.log(data)).fail(e => console.error(e));
// }

// function getHomePage() {
//     $.get('http://192.168.101.199:3000/home', data => {
//         //console.log(data)
//         window.location.href = data;
//         alert("type http://192.168.101.199:3000/home in the URL area");
//     }).fail(e => console.error(e));
//}

// function sendData(usernameParam, passwordParam) {
//     let data = JSON.stringify({
//         username: usernameParam,
//         password: passwordParam
//     });
//     $.post('http://192.168.101.199:3000/auth', { data: data },
//         res => {
//             // console.log(res.message);
//             let result = JSON.parse(res.message);
//             console.log(result);

//             try {
//                 if (result[0].username != null) {
//                     console.log("succes!");
//                     dataUser = usernameParam;
//                     alert(`SUCCES! Welcome, ${result[0].username} !`)
//                     getHomePage();

//                 }
//             } catch (err) {
//                 console.log("date gresite");
//                 alert("Wrong username or password");
//             }

//         }
//     ).fail(e => console.error(e));


// }

// $(document).ready(() => {
//     // getData();
//     // sendData();
// });

// function logInClicked() {
//     let username = $("#usernameInput").val();
//     let password = $("#passwordInput").val();
//     // console.log("clicked ");
//     sendData(username, password);

// }

// function getRegister() {
//     $.get('http://192.168.101.199:3000/register', data => {
//         console.log(data)
//         window.location.href = data;
//         alert("type http://192.168.101.199:3000/register in the URL area");
//     }).fail(e => console.error(e));
// }

