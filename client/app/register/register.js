(function() {
    angular.module('app').controller('RegisterCtrl', function($http, toaster, $location) {

        const vm = this;

        vm.username = '';
        vm.password = '';
        vm.passwordAgain = '';

        vm.register = () => {
            //  toaster.pop('info', "title", "text");
            if (vm.password === vm.passwordAgain) {

                $http.post('/newUser', { username: vm.username, password: vm.password })
                    .then(res => {
                        console.log(res.data.message);
                        if (res.data.message == "wrong") {
                            // alert("Wrong username or password, min 4 characters required");
                            toaster.pop('warning', "Wrong username or password, min 4 characters required", "");
                        } else {
                            toaster.pop('success', "Registred succefully", "");
                            $location.path("/");
                        }

                    })
                    .catch(err => {
                        console.error(err);
                        toaster.pop('error', "Something went wrong. Please try again", "");
                    });

            } else {
                // alert("Passwords do not match.");
                toaster.pop('warning', "Passwords do not match.", "");
            }


        }


        // vm.showUsername = () => {
        //     console.log(localStorage.getItem('username'));
        // }

        // vm.showUsername();
    })
})()