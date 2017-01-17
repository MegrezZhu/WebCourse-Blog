'use strict';

angular
    .module('blog', [
        'ngMaterial',
        'ngRoute',
        'blog.services',
        'blog.filters',
        'blog.articles',
        'blog.userPanel',
        'blog.regist',
        'blog.login'
    ])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue')
            .accentPalette('amber')
            .warnPalette('red')
            .backgroundPalette('grey');
    })
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .otherwise({redirectTo: '/'});
    })
    .controller('blogCtrl', function ($scope, globalData) {
        // console.log(globalData);
    });

angular
    .module('blog.services', [])
angular
    .module('blog.filters', []);