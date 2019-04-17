(function() {
    angular.module('app').controller('TestCtrl', function($http, toaster) {

        const vm = this;

        // vm.records = []
        // vm.getData = () => {
        //     let users = [];
        //     $http.get('/getUsers').then(res => {
        //         vm.records = res.data;
        //     }).catch(e => {
        //         console.error(e)
        //     });

        //     return users;
        // }


        // vm.getData();

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.usernameToShow = localStorage.getItem('username');
        }
        vm.showUsername();





        let officialPosts = [];


        vm.posts = [];
        vm.allSubsribers = [];

        vm.getPhotos = () => {
            $http.post('/getAllPosts', { idUser: localStorage.getItem("idUser") })
                .then(res => {
                    //photo = res.data.photo;
                    //vm.description = res.data.description;
                    //console.log(JSON.parse(res.data.message)[0]);
                    vm.posts = JSON.parse(res.data.message);
                    //console.log(vm.posts);
                    //vm.image = "http://localhost:3000/" + photo + ".jpg ";
                    //console.log(res.data);
                    vm.posts.forEach(element => {
                        let photo = element.photo;
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                        //console.log(element.photo);
                        //aici crapa inca 
                        officialPosts.push(element);
                    });



                })
                .catch(err => {
                    console.error(err)
                });
        }

        vm.getPhotos();


        vm.displayModal = false;
        // vm.isNotSubscribed = true;
        // vm.isSubscribed = false;

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



            vm.allSubsribers.forEach(elem => {
                console.log(elem.username, item.username);
                if (elem.username.valueOf() == item.username.valueOf()) {
                    console.log(vm.isNotSubscribed, vm.isSubscribed);
                    vm.isNotSubscribed = false;
                    vm.isSubscribed = true;
                } else {
                    vm.isNotSubscribed = true;
                    vm.isSubscribed = false;
                }
            })

            vm.displayModal = true;

        }

        vm.filteredsearch = vm.posts;
        vm.searchFor = "";
        vm.search = () => {
            vm.posts = [];
            if (vm.searchFor == "") {
                officialPosts.forEach(el => {
                    vm.posts.push(el);
                })
            } else {
                vm.filteredsearch = officialPosts.map((value, index, array) => {
                    if (value.username.includes(vm.searchFor)) {
                        console.log(value);
                        return value;
                    }
                })

                vm.filteredsearch.forEach(el => {
                    if (el) {
                        vm.posts.push(el);
                    }
                })


            }
        }


        getAllSubribers = function() {
            $http.post('/allSubsribers', { idUserFrom: localStorage.getItem("idUser") })
                .then(res => {
                    vm.allSubsribers = res.data;
                    console.log(vm.allSubsribers);
                })
                .catch(err => {
                    console.error(err)
                });
        }

        getAllSubribers();



        postNewSubscriber = function(idUserTo) {
            $http.post('/addNewSubscriber', { idUserFrom: localStorage.getItem("idUser"), idUserTo: idUserTo })
                .then(res => {
                    console.log(res.data.message);
                })
                .catch(err => {
                    console.error(err)
                });
        }

        postDeleteSubscriber = function(idUserTo) {
            $http.post('/deleteSubscriber', { idUserFrom: localStorage.getItem("idUser"), idUserTo: idUserTo })
                .then(res => {
                    console.log(res.data.message);
                })
                .catch(err => {
                    console.error(err)
                });
        }





        vm.subscribe = () => {
            console.log(vm.isSubscribed);
            vm.isNotSubscribed = false;
            vm.isSubscribed = true;
            postNewSubscriber(itemToShow.idUser);


        }

        vm.unSubscribe = () => {

            vm.isNotSubscribed = true;
            vm.isSubscribed = false;
            postDeleteSubscriber(itemToShow.idUser);
        }

    })
})()