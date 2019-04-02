// functie care se apeleaza ea 
(function() {
    const app = angular.module('app', ['ngRoute']);

    app.config($routeProvider => {
        $routeProvider
            .when("/", {
                templateUrl: 'app/home/home.html'
            })
            .when('/test', {
                templateUrl: 'app/test/test.html'
            })
            .when('/register', {
                templateUrl: 'app/register/register.html'
            })
            .when('/profile', {
                templateUrl: 'app/profile/profile.html'
            })
            .when('/newphoto', {
                templateUrl: 'app/newphoto/newphoto.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

})();