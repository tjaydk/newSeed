angular.module('login_directive', [])
    .controller("loginDirCtrl", function($http){
        var self = this;

        self.username   = "";
        self.password   = "";
        self.msg        = "";

        var setCookie = function(data){
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 30*60*1000;
            now.setTime(expireTime);
            document.cookie = 'Authorization='+data+';expires='+now.toGMTString()+';path=/';
        }

        self.login = function(){
            $http({
                method: 'POST',
                url: '/signup/authenticate',
                data: {username: self.username, password: self.password}
            }).then(function successCallback(response) {
                setCookie(response.data.token);
                self.msg = "You are now logged in";
            }, function errorCallback(response) {
                self.msg = response.data;
            });
        };
    })
    .directive('login', function(){
        return {
            restrict: 'E',
            templateUrl: '/components/login/login.html'
        }
    });