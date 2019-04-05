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


        console.log("Picture: " + localStorage.getItem("ng-drop-image-image"));
        // vm.image = 'http://gratuitor.ro/wp-content/uploads/2014/10/LittleVisuals-imagini-gratuite-@-gratuitor.jpg';
    });

})()