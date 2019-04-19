(function() {
    angular.module('app').controller('TestCtrl', function($http, toaster) {

        const vm = this;

        vm.posts = [];
        vm.allSubsribers = [];
        vm.isSubscribed = false;
        vm.displayModal = false;


        let officialPosts = [];

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        vm.getPhotos = () => {
            $http.post('/getAllPosts', { idUser: localStorage.getItem("idUser") })
                .then(res => {
                    vm.posts = JSON.parse(res.data.message);
                    vm.posts.forEach(element => {
                        let photo = element.photo;
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                        let timeDate = element.timeOfPost.substr(0, 10);
                        let year = timeDate.substr(0, 4);
                        let month = timeDate.substr(5, 2);
                        let day = timeDate.substr(8, 2);

                        let timeHour = element.timeOfPost.substr(11, 5);
                        element.timeOfPost = day + "/" + month + "/" + year + " - " + timeHour;
                        officialPosts.push(element);

                        console.log(element.timeOfPost);
                    });
                })
                .catch(err => console.error(err));
        }

        vm.getPhotos();

        vm.close = () => {
            vm.displayModal = false;
        }

        vm.copy = () => {
            console.log(vm.copyToClipboard);
            toaster.pop("info", "Code Copied!");
        }

        let itemToShow = {};

        vm.showItem = function(item) {
            console.log(item);

            vm.codeToShow = item.code;
            vm.descriptionToShow = item.description;
            vm.copyToClipboard = item.code;
            vm.photoToShow = item.photo;
            vm.usernameToShow = item.username;

            itemToShow = item;
            let checked = false;
            vm.isSubscribed = false;
            vm.isNotSubribed = true;
            vm.allSubsribers.forEach(elem => {
                if (elem.username.valueOf() == item.username.valueOf()) {
                    vm.isSubscribed = true;
                    vm.isNotSubribed = false;
                    checked = true;
                } else {
                    if (checked != true) {
                        vm.isSubscribed = false;
                        vm.isNotSubribed = true;
                    }
                }
            })
            vm.displayModal = true;
        }

        vm.filteredsearch = vm.posts;
        vm.searchFor = "";
        vm.search = () => {
            vm.posts = [];
            vm.isNotFound = false;
            if (vm.searchFor == "") {
                officialPosts.forEach(el => {
                    vm.posts.push(el);
                })
            } else {
                vm.filteredsearch = officialPosts.map((value, index, array) => {
                    let lowerUser = value.username.toLowerCase();
                    let lowerDescription = value.description.toLowerCase();
                    let lowerSearchFor = vm.searchFor.toLowerCase();

                    if (lowerUser.includes(lowerSearchFor) || lowerDescription.includes(lowerSearchFor)) {
                        console.log(value);
                        return value;
                    }
                })

                vm.filteredsearch.forEach(el => {
                    if (el) {
                        vm.posts.push(el);
                    }
                })
                if (vm.posts.length < 1) {
                    console.log("nothing found");
                    vm.isNotFound = true;
                }

            }
        }


        getAllSubribers = function() {
            $http.post('/allSubsribers', { idUserFrom: localStorage.getItem("idUser") })
                .then(res => vm.allSubsribers = res.data)
                .catch(err => console.error(err));
        }

        getAllSubribers();

        postNewSubscriber = function(idUserTo) {
            $http.post('/addNewSubscriber', { idUserFrom: localStorage.getItem("idUser"), idUserTo: idUserTo })
                .then(res => vm.allSubsribers = res.data)
                .catch(err => console.error(err));
        }

        postDeleteSubscriber = function(idUserTo) {
            $http.post('/deleteSubscriber', { idUserFrom: localStorage.getItem("idUser"), idUserTo: idUserTo })
                .then(res => vm.allSubsribers = res.data)
                .catch(err => console.error(err));
        }

        vm.subscribe = () => {
            if (vm.isSubscribed == false) {
                postNewSubscriber(itemToShow.idUser);
                vm.isSubscribed = true;
                vm.isNotSubribed = false;
            } else {
                postDeleteSubscriber(itemToShow.idUser);
                vm.isSubscribed = false;
                vm.isNotSubribed = true;
            }
        }

    })
})()