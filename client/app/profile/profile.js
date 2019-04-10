(function() {
    angular.module('app').controller('ProfileCtrl', function($scope) {

        const vm = this;


        vm.showUsername = () => {
            //console.log(localStorage.getItem('username'));
            vm.username = localStorage.getItem('username');
        }
        vm.showUsername();



        // function readTextFile(file, callback) {
        //     var rawFile = new XMLHttpRequest();
        //     rawFile.overrideMimeType("application/json");
        //     rawFile.open("GET", file, true);
        //     rawFile.onreadystatechange = function() {
        //         if (rawFile.readyState === 4 && rawFile.status == "200") {
        //             callback(rawFile.responseText);
        //         }
        //     }
        //     rawFile.send(null);
        // }

        // readTextFile("/Users/Documents/workspace/test.json", function(text) {
        //     var data = JSON.parse(text);
        //     console.log(data);
        // });

    })
})()