
function getData() {
    $.get('http://localhost:3000/getUsers', data => console.log(data)).fail(e => console.error(e));
}

function sendData(usernameParam, passwordParam) {
    let data = JSON.stringify({
        username: usernameParam,
        password: passwordParam
    });
    $.post('http://localhost:3000/auth', {data : data},
        res =>
            {   
                // console.log(res.message);
                let result = JSON.parse(res.message);
                console.log(result);

                try{
                    if(result[0].username != null){
                        console.log("succes!");
                        alert(`SUCCES! Welcome, ${result[0].username} !`)
   
                    }
                }catch(err){
                    console.log("date gresite");
                    alert("Wrong username or password");
                }
               
                

            }
    ).fail(e => console.error(e));
}

$(document).ready(() => {
    // getData();
    // sendData();
});

function logInClicked() {
    let username = $("#usernameInput").val();
    let password = $("#passwordInput").val();
   // console.log("clicked ");
    sendData(username, password);
}