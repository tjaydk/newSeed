'use strict';

angular.module('frontpageView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/frontpage/frontpage.html',
            controller: 'FrontpageCtrl',
            controllerAs: "Ctrl"
        });
    }])

    .controller('FrontpageCtrl', [function() {
        var self = this;

        self.title = "Hello from CTRL";
    }]);