

(function() {
        angular.module('app').controller('RegisterCtrl', function($http) {

        const vm = this;

        vm.username = '';
        vm.password = '';
        vm.passwordAgain = '';
        
        vm.register = () => {
           
            if(vm.password === vm.passwordAgain){
                $http.post('/newUser', {username: vm.username, password: vm.password})
                .then(res => {
                    console.log(res.data.message);

                    if(res.data.message == "wrong"){
                        alert("Wrong username or password, min 4 characters required");
                    }else{
                        localStorage.setItem('username', res.data.message);
                        window.location.href="#!test";
                    }
                    
                })
                .catch(err => {
                    console.error(err)
                });
              
            }else{
                alert("Passwords do not match.");
            }

          
        }


        vm.showUsername = () => {
            console.log(localStorage.getItem('username'));
        }

        vm.showUsername();
    })
})()