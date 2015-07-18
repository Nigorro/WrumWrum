'use strict';

angular.module('posts').controller('OnePostController', ['$scope', '$http', '$location', '$stateParams',
    function ($scope, $http, $location, $stateParams) {
        $scope.id = $stateParams.id;
        $scope.post = [];
        $http.get('/posts/' + $scope.id).then(function(response){
            $scope.post = response.data.post;
            $scope.load = true;
        });
    }
]);
