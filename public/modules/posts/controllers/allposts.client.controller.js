'use strict';

angular.module('posts').controller('AllPosts', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.posts = [];
         $http.get('/posts/').then(function(response){
            $scope.posts = response.data.reverse();
        });
    }
]);