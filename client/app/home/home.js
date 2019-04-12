(function() {
    angular.module('app').controller('TestCtrl', function($http) {

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


        vm.getData();

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

    })
})()