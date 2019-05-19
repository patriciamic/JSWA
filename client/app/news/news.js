(function () {
    angular.module('app').controller('NewsCtrl', function ($http, toaster) {

        const vm = this;

        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();



        vm.newsList = [];


        getNews = function () {
            $http.post('/news', { idUser: localStorage.getItem("idUser") })
                .then(res => {
                    // console.log(res.data);
                    vm.newsList = res.data;
                    vm.newsList.forEach(element => {
                        let photo = element.photo;
                        element.timeOfPost = getDateFormat(element);
                        // element.photo = "https://jswa-templates.herokuapp.com/" + photo + ".jpg "; //heroku
                        element.photo = "http://localhost:3000/" + photo + ".jpg ";
                    });

                    // console.log(vm.newsList);

                })
                .catch(err => console.error(err));
        }

        getNews();





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
            // vm.descriptionToShow = item.description;
            vm.copyToClipboard = item.code;
            vm.photoToShow = item.photo;
            vm.displayModal = true;
        }


        function getDateFormat(elem) {
            let timeDate = elem.timeOfPost.substr(0, 10);
            let year = timeDate.substr(0, 4);
            let month = timeDate.substr(5, 2);
            let day = timeDate.substr(8, 2);
            let timeHour = elem.timeOfPost.substr(11, 5);
            return day + "/" + month + "/" + year + " - " + timeHour;
        }



    })
})()