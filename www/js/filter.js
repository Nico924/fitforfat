angular.module('mainAppFilter', []).
	filter('getDayStr', function(){
	// 1234565433456 ------->  "Thuesday, 12/4/98"
	return function(input){return getDateLongFormat(input);
		};
	}).filter('getHourStr', function(){
	// 1234565433456 ------->  "12:45 AM"
	return function(input){
			return getHour(input);
		};
	}).filter('getDateStr', function(){
	// 1234565433456 ------->  "4/12"
	return function(input){
			return getDateShortFormat(input);
		};
	}).filter('getMMDDYYYYStr', function(){
	// 1234565433456 ------->  "02/24/1223"
	return function(input){
			return getDateFormat(input);
		};
	});