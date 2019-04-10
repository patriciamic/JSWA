(function () {
    angular.module('app').controller('ProfileCtrl', function ($scope, $http) {

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




    })
})()