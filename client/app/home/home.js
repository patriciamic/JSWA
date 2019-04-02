(function () {
    angular.module('app').controller('HomeCtrl', function ($http) {
        const vm = this;

        vm.username = '';
        vm.password = '';

        vm.login = () => {

            $http.post('/auth', { username: vm.username, password: vm.password })
                .then(res => {
                    console.log(JSON.parse(res.data.message)[0].username);

                    localStorage.setItem('username', JSON.parse(res.data.message)[0].username);
                    window.location.href = "#!test";

                })
                .catch(err => {
                    console.error(err)
                    alert("Wrong username or password.");
                });

        }

    });
})()