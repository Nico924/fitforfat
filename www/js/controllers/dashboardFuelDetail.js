function DashboardFuelDetailCtrl($scope, $http, $routeParams) {
	/*
	go back to dashBoard
	*/
	$scope.goBack=function() {
		if ($scope.isCurrentWeek) {
			changeURL('#/dashboard?focus=fuel');
		}else{
			changeURL('#/dashboard?focus=fuel&timestamp=' + $routeParams.timestamp);
		}
	}
	/*
	Data treatment 
	*/
	$scope.dataTreatment=function(data) {
		for(var key in data.fuel_detail){
			data.fuel_detail[key].dateFormat= getDateFormat(parseInt(data.fuel_detail[key].date));
			data.fuel_detail[key].day		= getWeekDay(parseInt(data.fuel_detail[key].date));
			data.fuel_detail[key].hour		= getHour(parseInt(data.fuel_detail[key].date));
		}

		$scope.DASHDETAIL = data;
	};
	/*
	Load content
	*/
	$scope.loadContent=function(){
        if ($scope.isCurrentWeek){
            timestamp = new Date().getTime();
        }else{
            timestamp = parseInt($routeParams.timestamp);
        }

		var config={
			'token'           :getInfo().token,
			'user_foreign_key':getInfo().user_foreign_key,
			'driver_id'       :getDriversIDList(),
			"week_ending"     :getWeekEndingParam(timestamp)
		};

		executeRequest("dashboardFuelDetail", config,true, $scope, $http, $scope.dataTreatment);
	};
	/*
	Constructor
	*/
	$scope.init=function(){
		try{
            $scope.isCurrentWeek = !($routeParams.hasOwnProperty("timestamp"));
			$scope.loadContent();
		}catch(e){
			alert(e);
		}
		pageReady();
	};
	$scope.init();
	$scope.$on('$includeContentLoaded', function(){
		// pageReady();
	});
}