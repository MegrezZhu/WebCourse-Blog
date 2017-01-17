'use strict'

angular
    .module('blog.filters')
    .filter('myCrypto', function () {
        return function (origin) {
            if (!origin) return null;
            console.log(origin);
            origin = Crypto.MD5(origin).toString();
            origin = Crypto.MD5(origin).toString();
            return origin;
        }
    });