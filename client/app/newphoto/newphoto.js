(function () {
    let app = angular.module('app');
    app.controller('NewPhotoCtrl', function ($http) {
        const vm = this;


        vm.image = '';
        vm.description = '';


        // console.log("Picture: " + localStorage.getItem("ng-drop-image-image"));
        // vm.image = 'http://gratuitor.ro/wp-content/uploads/2014/10/LittleVisuals-imagini-gratuite-@-gratuitor.jpg';

        vm.addNewPost = () => {

            console.log("clicked dada");

            $http.post('/addNewPost', { idUser: localStorage.getItem("idUser"), image: localStorage.getItem("ng-drop-image-image"), description: vm.description })
                .then(res => {
                    // window.location.href = "#!profile";
                    console.log("data sent");

                    localStorage.setItem("ng-drop-image-image", "");

                })
                .catch(err => {
                    console.error(err)
                    alert("Something went wrong, please try again.");
                });

        }


        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();


    });
})()