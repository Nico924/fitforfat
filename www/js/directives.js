// new html tags creation.
angular.module('mainAppDirectives', []).
	
	// WARNING directives/attributes name are written in camelCase, the tags not. Exemple:
	// This directive will be used this way:
	// <my-menu left-icon="update-icon" ... ></my-menu>
	directive('myMenu', function factory($compile) {
		
		return {
			templateUrl: 'partials/menu.html',
			// The restriction acts on the element which means that we won't be able to
			// use it as an attribute or so: "<div my-menu></div>" won't be recognized.
			restrict: 'E', 
			
			scope:{
				// the "@" symbol means that the variable takes the value of the attribute that has the same name
				leftIcon:'@',
				leftAction:'@',
				leftClass:'@',
				leftText:'@',
				rightIcon:'@',
				rightAction:'@',
				rightClass:'@',
				rightText:'@',
				title:'@'
			}
		};

	}).

	directive('infoArrowTable', function factory($compile) {

		return {
			templateUrl: 'partials/infoArrowTable.html',
			restrict: 'E',
			scope:{
				class:"@",
				color:"@",
				th1:"@",
				td1:"@",
				th2:"@",
				td2:"@",
				unite:"@"
			}
		};

	}).

	directive('infoTable', function factory($compile) {

		return {
			templateUrl: 'partials/infoTable.html',
			restrict: 'E',
			scope:{
				class:"@",
				th1:"@",
				td1:"@",
				th2:"@",
				td2:"@",
				th3:"@",
				td3:"@"
			}
		};

	}).

	directive('inputField', function factory($compile) {

		return {
			templateUrl: 'partials/inputField.html',
			restrict: 'E',
			scope:{
				class:"@",
				icon:"@",
				placeholder:"@"
			}
		};

	}).

	directive('adressTable', function factory($compile) {

		return {
			templateUrl: 'partials/adressTable.html',
			restrict: 'E',
			scope:{
				class:"@",
				number:"@",
				street:"@",
				extra:"@",
				city:"@",
				state:"@",
				zipcode:"@",
				type:"@",
				start:"@",
				end:'@'
			}
		};

	}).
	
	directive('whenScrolled', function() {
			return function(scope, elm, attr) {
					var raw = elm[0];

					var funCheckBounds = function(evt) {
							
							var rectObject = raw.getBoundingClientRect();
							if (rectObject.bottom < window.innerHeight + 100) {
								scope.$apply(attr.whenScrolled);
							}

					};
					
					angular.element(window).bind('scroll load', funCheckBounds);
					scope.$on('$destroy', function() {
						angular.element(window).unbind('scroll load');
					});
			};
	});