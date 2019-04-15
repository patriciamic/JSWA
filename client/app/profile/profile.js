(function() {
    angular.module('app').controller('ProfileCtrl', function($scope, $http, toaster) {

        const vm = this;

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        vm.posts = [];


        vm.getData = () => {
            $http.post('/getLatesPhoto', { idUser: localStorage.getItem("idUser") })
                .then(res => {
                    //photo = res.data.photo;
                    //vm.description = res.data.description;
                    //console.log(JSON.parse(res.data.message)[0]);
                    vm.posts = JSON.parse(res.data.message);
                    console.log(vm.posts);
                    //vm.image = "http://localhost:3000/" + photo + ".jpg ";
                    console.log(res.data);
                    vm.posts.forEach(element => {
                        let photo = element.photo;
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                        console.log(element.photo);
                    });

                })
                .catch(err => {
                    console.error(err)
                });
        }

        vm.getData();

        vm.displayModal = false;

        vm.close = () => {
            vm.displayModal = false;
        }

        vm.copy = () => {
            console.log(vm.copyToClipboard);
            toaster.pop("info", "Code Copied!");
        }

        vm.showItem = function(item) {
            vm.codeToShow = item.code;
            vm.descriptionToShow = item.description;
            vm.copyToClipboard = item.code;
            vm.photoToShow = item.photo;
            vm.displayModal = true;
        }

    })
})()