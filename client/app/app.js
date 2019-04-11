// functie care se apeleaza ea 
(function() {
    const app = angular.module('app', ['ngRoute', 'ngStorage', 'ngDropImage', 'toaster', 'ngAnimate']);

    // app.run($rootScope => {
    //     $rootScope.$on("$locationChangeStart", (event, next, current) => {
    //         if (~current.indexOf("newphoto")) {
    //             localStorage.setItem("ng-drop-image-image", "");
    //         }
    //     })
    // })

    app.config($routeProvider => {
        $routeProvider
            .when("/", {
                templateUrl: 'app/login/login.html'
            })
            .when('/home', {
                templateUrl: 'app/home/home.html'
            })
            .when('/register', {
                templateUrl: 'app/register/register.html'
            })
            .when('/profile', {
                templateUrl: 'app/profile/profile.html'
            })
            .when('/newphoto', {
                templateUrl: 'app/newphoto/newphoto.html',
            })
            .otherwise({
                redirectTo: '/home'
            });
    })

})();