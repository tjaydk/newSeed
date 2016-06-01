angular.module('signup_directive', [])
    .controller("signupDirCtrl", function($http){
        var self = this;

        self.username   = "";
        self.password   = "";
        self.msg        = "";

        self.signup = function(){
            alert("Hello");
            $http({
                method: 'POST',
                url: '/signup/signup',
                data: {username: self.username, password: self.password}
            }).then(function successCallback(response) {
                self.msg = response.data;
            }, function errorCallback(response) {
                self.msg = response.data;
            });
        };
    })
    .directive('signup', function(){
        return {
            restrict: 'E',
            templateUrl: '/components/signup/signup.html'
        }
    });