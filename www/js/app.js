angular.module('app', ['ngSanitize','ngRoute','directives','factories','controllers']). 
	config(['$routeProvider', function($routeProvider) { 
	$routeProvider.
		when('/', {templateUrl: 'partials/tracking.html',controller:"TrackingController"}).
        when('/tracking', {templateUrl: 'partials/tracking.html',controller:"TrackingController"}).
		when('/post', {templateUrl:'partials/post.html',controller:"PostController"}).
        when('/store',{templateUrl:'partials/store.html',controller:"StoreController"}).
		otherwise({redirectTo: '/tracking'});
	}]).run(function($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function() {
            //also call all the other configuration
        });
});