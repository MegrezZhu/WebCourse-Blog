'use strict';

angular
    .module('blog.articles', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/articles', {
                templateUrl: './components/articles/articles.html',
                controller: 'articlesController',
            });
    })
    .controller('articlesController', function ($scope) {

    });