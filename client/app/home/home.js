(function() {
    angular.module('app').controller('TestCtrl', function($http, toaster) {

        const vm = this;

        vm.posts = [];
        vm.allSubsribers = [];
        vm.isSubscribed = false;
        vm.displayModal = false;
        vm.displayModalProfile = false;


        let officialPosts = [];

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();

        vm.getPhotos = () => {
            console.log("get all posts");
            $http.post('/allPosts', { idUser: localStorage.getItem("idUser") })
                .then(res => {

                    vm.posts = JSON.parse(res.data.message);

                    console.log(vm.posts);
                    vm.posts.forEach(element => {
                        let photo = element.photo;
                        element.timeOfPost = getDateFormat(element);
                        console.log(element.timeOfPost);
                        // element.photo = "https://jswa-templates.herokuapp.com/" + photo + ".jpg "; //heroku
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                       
                        officialPosts.push(element);

                    });
                })
                .catch(err => console.error(err));
        }

        vm.getPhotos();


        function getDateFormat(elem) {
            let timeDate = elem.timeOfPost.substr(0, 10);
            let year = timeDate.substr(0, 4);
            let month = timeDate.substr(5, 2);
            let day = timeDate.substr(8, 2);
            let timeHour = elem.timeOfPost.substr(11, 5);
            return day + "/" + month + "/" + year + " - " + timeHour;
        }

        vm.close = () => vm.displayModal = false;



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

        vm.postsForFollowingProfile = [];

        vm.getDataForFollowingProfile = function(idUserFollowingProfile) {
            $http.post('/allPostsById', { idUser: idUserFollowingProfile })
                .then(res => {
                    vm.postsForFollowingProfile = JSON.parse(res.data.message);
                    vm.postsForFollowingProfile.forEach(element => {
                        let photo = element.photo;
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                        element.timeOfPost = getDateFormat(element);
                    });

                    console.log(vm.postsForFollowingProfile);
                })
                .catch(err => console.error(err));
        }

        vm.showFollowingProfile = function(item) {
            console.log(item.idUserTo);
            vm.getDataForFollowingProfile(item.idUserTo);
            vm.usernameToShow = item.username;
            vm.displayModalProfile = true;
            console.log(vm.postsForFollowingProfile);
        }

        vm.closeProfile = () => vm.displayModalProfile = false;


    })
})()