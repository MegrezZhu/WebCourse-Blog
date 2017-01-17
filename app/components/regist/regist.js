'use strict';

angular
    .module('blog.regist', ['ngMaterial', 'blog.services'])
    .controller('registCtrl', function ($scope, $http, $location, globalData) {
        $scope.user = {};
        $scope.regist = function () {
            $http.post('/api/regist', $scope.user)
                 .then(res => {
                     if (res.data === 'ok') {
                         console.log('ok');
                         $location.url('/');
                     } else {

                     }
                 })
                 .catch(err => {

                 });
        };
        $scope.reset = function () {
            $scope.user = {};
        };
        $scope.check = checker;
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/regist', {
                templateUrl: '/components/regist/regist.html',
                controller: 'registCtrl',
                controllerAs: 'ctrl'
            });
    });

function checker() {

}