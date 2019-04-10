(function() {
    angular.module('app').controller('ProfileCtrl', function($scope, $http) {

        const vm = this;



        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        vm.photo = {};
        vm.getData = () => {
            let users = [];
            $http.get('/getLatesPhoto').then(res => {
                vm.photo = res.data;

                vm.image = "http://localhost:3000/" + vm.photo + ".jpg ";
                console.log(res.data);
            }).catch(e => {
                console.error(e)
            });

            return users;
        }


        vm.getData();




    })
})()