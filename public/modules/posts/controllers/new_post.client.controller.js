'use strict';

angular.module('posts').controller('NewPostController', ['$scope', '$http', '$location', 'Upload', 'Users', 'Authentication',
    function($scope, $http, $location, Upload,  Users, Authentication) {
        $scope.user = Authentication.user;
        console.log(Upload);
        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/signin');
        $scope.inProcess = false;
        $scope.params = {};
        //

        $scope.$watch('files', function () {
            console.log($scope.files[0].name);
                $http.post('/upload', {
                    file_name: $scope.files[0].name,
                    file_type: $scope.files[0].type
                })
                    .success( function (data) {
                        console.log(data);

                            var req = {
                                 method: 'PUT',
                                 url: data.signed_request,
                                 data: $scope.files[0],
                                 headers: {
                                    'Content-Type': $scope.files[0].type,
                                }
                            };
                            console.log(req);
                            $http(req).success(function (){
                                console.log('good');
                                $scope.params.image = data.url;

                            }).error(function(err){
                                console.log('error', err);
                            });
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            });

        $scope.upload = function (files) {
            if (files && files.length) {
                // for (var i = 0; i < files.length; i++) {
                    var file = files;
                    Upload.upload({
                        url: '/upload',
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' +
                                    evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                    JSON.stringify(data.path));
                        $scope.params.image = data.path;
                        // console.log(data.path.path.imageName, data.path);
                    });
                // }
            }
        };

        //

        $scope.newPost = function () {
            console.log($scope.params);
            $http.post('/posts/newpost/', $scope.params)
                .success(function (data, status, headers, config) {
                    $scope.inProcess = false;
                    console.log('Success!');
                    $scope.inProcess = true;
                    $scope.params = {};
                })
                .error(function(data, status, headers, config) {
                    $scope.inProcess = false;
                });
        };

    }
]);