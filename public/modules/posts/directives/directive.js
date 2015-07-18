(function (angular) {

    'use strict';

    // Post Directive
    angular.module('posts').directive('post', function() {
            return {
                controller: 'postDirectiveCtrl',
                restrict: 'EA',
                templateUrl: './modules/posts/directives/template.tpl',
                scope: {
                    posts: '=post'
                },
                link: function() {
                    console.log('Directive');
                }
            };
        });

    angular.module('posts').controller('postDirectiveCtrl', function($scope, $element, $attrs) {
        // console.log($scope.posts);
        this.post = $scope.posts;
    });

})(window.angular);