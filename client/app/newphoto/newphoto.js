(function() {
    let app = angular.module('app');
    app.controller('NewPhotoCtrl', function($http) {
        const vm = this;


        vm.image = '';
        vm.description = '';
        localStorage.removeItem("ng-drop-image-image");
        // console.log("Picture: " + localStorage.getItem("ng-drop-image-image"));

        vm.addNewPost = () => {
            if (localStorage.getItem("ng-drop-image-image") && localStorage.getItem("ng-drop-image-image") != "") {

                console.log("clicked dada");
                console.log(localStorage.getItem("ng-drop-image-image"));

                $http.post('/addNewPost', { image: localStorage.getItem("ng-drop-image-image"), description: vm.description })
                    .then(res => {
                        // window.location.href = "#!profile";
                        console.log("data sent");
                        // console.log(res);
                        localStorage.setItem("ng-drop-image-image", "");
                        window.location.href = "#!profile";

                    })
                    .catch(err => {
                        console.error(err)
                        alert("Something went wrong, please try again.");
                    })
            }

        }


        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();


    });
})()