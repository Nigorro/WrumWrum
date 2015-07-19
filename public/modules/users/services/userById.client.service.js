'use strict';

// Authentication service for user variables
angular.module('users').service('Userbyid', ['$resource',
    function($resource) {
        return $resource('/users/find/:id', {userId:'@id'});
    }
]);