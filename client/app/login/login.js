(function () {
    angular.module('app').controller('HomeCtrl', function ($http, toaster, $location) {
        const vm = this;

        vm.username = '';
        vm.password = '';

        vm.login = () => {

            $http.post('/auth', { username: vm.username, password: vm.password, token: localStorage.getItem("token") })
                .then(res => {
                    console.log(JSON.parse(res.data.message)[0]);

                    let result = JSON.parse(res.data.message)[0];
                    let id = result.id;
                    let user = result.username;


                    //heroku
                    // let result = JSON.parse(res.data.message)[0].LoginUpdateToken.split(',');
                    // console.log(JSON.parse(res.data.message)[0].LoginUpdateToken);
                    // let id = result[0].substr(1, 2);
                    // let user = result[1];
                    // let token = result[2].substr(0, result[2].length - 1);

                    localStorage.setItem('username', user);
                    localStorage.setItem('idUser', id)
                    // localStorage.setItem('token', token);
                    $location.path("/home");

                })
                .catch(err => {
                    console.error(err)
                    // alert("Wrong username or password.");
                    toaster.pop('error', "Wrong username or password.", "");
                });
        }

    });
})()