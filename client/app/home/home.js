(function () {
    angular.module('app').controller('TestCtrl', function ($http) {

        const vm = this;

        vm.records = []
        vm.getData = () => {
            let users = [];
            $http.get('/getUsers').then(res => {
                vm.records = res.data;
            }).catch(e => {
                console.error(e)
            });

            return users;
        }

<<<<<<< HEAD
                    localStorage.setItem('username', JSON.parse(res.data.message)[0].username);
                    
                    localStorage.setItem('idUser', JSON.parse(res.data.message)[0].id);
                    //console.log(res.data.message)
                    //localStorage.setItem('username', JSON.parse(res.data.message));
                    window.location.href = "#!test";
=======
>>>>>>> master

        vm.getData();

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

    })
})()