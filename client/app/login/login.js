(function() {
    angular.module('app').controller('HomeCtrl', function($http, toaster, $location) {
        const vm = this;

        vm.username = '';
        vm.password = '';

        vm.login = () => {

            $http.post('/auth', { username: vm.username, password: vm.password, token: localStorage.getItem("tokenFCM") })
                .then(res => {
                    console.log(JSON.parse(res.data.message)[0].username);

                    localStorage.setItem('username', JSON.parse(res.data.message)[0].username);
                    localStorage.setItem('idUser', JSON.parse(res.data.message)[0].id)
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