(function() {
    angular.module('app').controller('ProfileCtrl', function($http, toaster) {

        const vm = this;

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        vm.posts = [];


        vm.getData = () => {
            $http.post('/allPostsById', { idUser: localStorage.getItem("idUser") })
                .then(res => {
                    vm.posts = JSON.parse(res.data.message);
                    vm.posts.forEach(element => {
                        let photo = element.photo;
                        // element.photo = "https://jswa-templates.herokuapp.com/" + photo + ".jpg "; //heroku
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                        
                        console.log(element.photo);
                    });
                })
                .catch(err => console.error(err));
        }

        vm.getData();

        vm.noOfFollowing = 0;
        getAllSubribers = function() {
            $http.post('/allSubsribers', { idUserFrom: localStorage.getItem("idUser") })
                .then(res => {
                    vm.allSubsribers = res.data;
                    vm.noOfFollowing = vm.allSubsribers.length;
                })
                .catch(err => console.error(err));
        }

        getAllSubribers();



        vm.noOfFollowers = 0;
        getAllFollowers = function() {
            $http.post('/allFollowers', { idUserTo: localStorage.getItem("idUser") })
                .then(res => {
                    // vm.allSubsribers = res.data;
                    console.log(res.data.length);
                    vm.noOfFollowers = res.data.length;
                })
                .catch(err => console.error(err));
        }

        getAllFollowers();




        vm.displayModal = false;

        vm.close = () => {
            vm.displayModal = false;
        }

        vm.copy = () => {
            console.log(vm.copyToClipboard);
            toaster.pop("info", "Code Copied!");
        }

        vm.showItem = function(item) {
            console.log("clicked show item");
            console.log(item);
            vm.codeToShow = item.code;
            vm.descriptionToShow = item.description;
            vm.copyToClipboard = item.code;
            vm.photoToShow = item.photo;
            vm.displayModal = true;
        }

    })
})()