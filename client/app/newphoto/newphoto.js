(function() {
    let app = angular.module('app');
    app.controller('NewPhotoCtrl', function($http, toaster, $location) {
        const vm = this;

        vm.image = '';
        vm.description = '';
        localStorage.removeItem("ng-drop-image-image");

        // console.log("code: " + vm.code);

        vm.addNewPost = () => {
            console.log("code: " + vm.code);
            if (vm.description != '') {
                if (localStorage.getItem("ng-drop-image-image") && localStorage.getItem("ng-drop-image-image") != "") {

                    console.log("clicked dada");

                    $http.post('/addNewPost', { idUser: localStorage.getItem("idUser"), image: localStorage.getItem("ng-drop-image-image"), description: vm.description, code: ` ` + vm.code + ` ` })
                        .then(res => {
                            console.log("data sent");
                            localStorage.setItem("ng-drop-image-image", "");

                            toaster.pop("success", "Added succefully");
                            $location.path("/profile");

                        })
                        .catch(err => {
                            console.error(err)
                            toaster.pop("error", "Something went wrong, please try again.");
                        })
                } else {
                    toaster.pop("error", "Drag the photo");
                }
            } else {
                toaster.pop("error", "Description is necessary");
            }

        }

        vm.showUsername = () => {
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();


    });
})()