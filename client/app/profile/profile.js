(function() {
    angular.module('app').controller('ProfileCtrl', function($scope, $http) {

        const vm = this;



        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        let photo = {};
        vm.getData = () => {
            let users = [];
            $http.get('/getLatesPhoto').then(res => {
                photo = res.data.photo;
                vm.description = res.data.description;
                vm.image = "http://localhost:3000/" + photo + ".jpg ";
                console.log(res.data);
            }).catch(e => {
                console.error(e)
            });

            return users;
        }


        vm.getData();




    })
})()