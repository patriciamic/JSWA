(function() {
    let app = angular.module('app');
    app.controller('NewPhotoCtrl', function() {
        const vm = this;
        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        vm.image = '';
        // vm.image = 'http://gratuitor.ro/wp-content/uploads/2014/10/LittleVisuals-imagini-gratuite-@-gratuitor.jpg';
    });

})()