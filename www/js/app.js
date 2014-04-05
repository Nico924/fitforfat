// here are the links between the main app and the filters/directives.
angular.module('mainApp', ['mainAppFilter','mainAppDirectives']).

	config(['$routeProvider', function($routeProvider) { $routeProvider
	
	// when the address ends with "#/profile" : load "partials/profile.html" template and the necessary data with the "ProfileCtrl" controller.
		.when('/login',
		{templateUrl: 'partials/login.html'})
		
		.when('/profile',
		{templateUrl: 'partials/profile.html'})
		
		.when('/profileContactDetail',
		{templateUrl: 'partials/profileContactDetail.html'})

		.when('/profileEdit',
		{templateUrl: 'partials/profileEdit.html'})
		
		.when('/dashboard',
        {templateUrl: 'partials/dashboard.html'})
		
		.when('/dashboardLastWeek',
		{templateUrl: 'partials/dashboardLastWeek.html'})
		
		.when('/dashboardFuelDetail',
		{templateUrl: 'partials/dashboardFuelDetail.html'})
		
		.when('/payStubs',
		{templateUrl: 'partials/payStubs.html'})
		
		.when('/safety',
		{templateUrl: 'partials/safety.html'})
		
		.when('/settings',
		{templateUrl: 'partials/settings.html'})
		
		.when('/changeDriver',
		{templateUrl: 'partials/changeDriver.html'})
		
		.when('/rejectReason',
		{templateUrl: 'partials/rejectReason.html'})

		.when('/tenders',
		{templateUrl: 'partials/tenders.html'})

		.when('/tendersTripDetail',
		{templateUrl: 'partials/tendersTripDetail.html'})
		
		.when('/tendersTrip',
		{templateUrl: 'partials/tendersTrip.html'})
		
		.when('/tendersHistory',
		{templateUrl: 'partials/tendersHistory.html'})
		
		.when('/changePassword',
		{templateUrl: 'partials/changePassword.html'})
		
		.when('/resetPassword',
		{templateUrl: 'partials/resetPassword.html'})

		.when('/terms',
		{templateUrl: 'partials/terms.html'})

		.when('/walkThrough',
		{templateUrl: 'partials/walkThrough.html'})
    
        .when('/externalLink',
		{templateUrl: 'partials/externalLink.html'})
		
		// .otherwise({redirectTo: '/login'});
		.otherwise({redirectTo: '/'});
	}]).

	// Allow geo URI (protocol). Allow google maps launching.
	config( ['$compileProvider', function( $compileProvider ) {
        
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|geo|tel|mailto):/);
    
    }]);