(function () {
    angular.module('app').controller('TestCtrl', function ($http, toaster) {

        const vm = this;

        vm.records = []
        vm.getData = () => {
            let users = [];
            $http.get('/getUsers').then(res => {
                vm.records = res.data;
            }).catch(e => {
                console.error(e)
            });

            return users;
        }


        vm.getData();

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();





        let officialPosts = [];


        vm.posts = [];


        vm.getPhotos = () => {
            $http.post('/getAllPosts', { idUser: localStorage.getItem("idUser") })
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

        vm.close = () => {
            vm.displayModal = false;
        }

        vm.copy = () => {
            console.log(vm.copyToClipboard);
            toaster.pop("info", "Code Copied!");
        }

        vm.showItem = function (item) {
            console.log(vm.codeToShow);
            console.log(vm.descriptionToShow);
            console.log(vm.copyToClipboard);
            console.log(vm.photoToShow);
            console.log(item);

            vm.codeToShow = item.code;
            vm.descriptionToShow = item.description;
            vm.copyToClipboard = item.code;
            vm.photoToShow = item.photo;
            vm.usernameToShow = item.username;
            vm.displayModal = true;

            console.log(vm.displayModal)
        }

        vm.filteredsearch = vm.posts;
        vm.searchFor = "";
        vm.search = () => {
            vm.posts = [];
            if(vm.searchFor == "") {
                officialPosts.forEach(el => {
                    vm.posts.push(el);
                })
            }
            else{
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

    })
})()