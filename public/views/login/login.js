'use strict';

angular.module('loginView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: "Ctrl"
        });
    }])

    .controller('LoginCtrl', function($http) {
        var self = this;
        var cookieArray;

        self.data = [];
        self.msg = "";
        self.getSecureData = function() {
            var cookiesArray = (document.cookie.split(';'));
            cookiesArray.forEach(function(cookie){
                if(cookie.substring(0,3) == " Au" || cookie.substring(0,3) == "Aut") {
                    cookieArray = cookie.split('=');
                }
            });

            var token = cookieArray[1];
            $http({
                method: 'GET',
                url: '/api/names',
                headers: {'Authorization': token}
            }).then(function successCallback(response) {
                self.data = response.data;
                self.msg = "";
            }, function errorCallback(response) {
                self.msg = response.data.mesage;
                self.date = [];
            });
        }
    });