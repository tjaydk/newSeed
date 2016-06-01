angular.module('bootstrap_navbar_directive', [])
.directive('navbar', function(){
    return {
        restrict: 'E',
        templateUrl: '/components/bootstrap_navbar/navbar.html'
    }
});