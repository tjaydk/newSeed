'use strict';

angular.module('signupView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'views/signup/signup.html',
            controller: 'SignupCtrl',
            controllerAs: "Ctrl"
        });
    }])

    .controller('SignupCtrl', [function() {
        var self = this;
    }]);