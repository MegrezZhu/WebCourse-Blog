'use strict';

angular
    .module('blog.login', ['ngMaterial', 'blog.services'])
    .controller('loginCtrl', function ($scope, globalData, myCryptoFilter) {
        $scope.login = {};
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/components/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'ctrl'
            });
    });