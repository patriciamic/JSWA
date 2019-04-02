(function () {
    angular.module('app').controller('ProfileCtrl', function ($scope) {

        const vm = this;

 
        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

    })
})()