function DashboardCtrl($scope, $http, $routeParams){
    /*
    changeURL
    */
    $scope.changeURL=function(url) {
        changeURL(url);
    };

    /*
    see Detail link(url)
    */
    $scope.seeDetail=function(){
        changeURL('#/dashboardFuelDetail');
        if ($scope.isCurrentWeek) {
            changeURL('#/dashboardFuelDetail');
        }else{
            changeURL('#/dashboardFuelDetail?timestamp=' + $routeParams.timestamp);
        }
    };
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        $scope.DASH = data;
        /*
        if (data.fuel == ""){
            alertNoData("No fuel detail available at this time");
        }else{
            $scope.DASH = data;
        }
        */
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
            'driver_id'       :getDriversIDList(), // Warning it's a list of id
            "week_ending"     :getWeekEndingParam(timestamp)
        };
        
        executeRequest("dashboard", config,true, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            $scope.LastWeekTimestamp = new Date().getTime() - 604800000;
            $scope.isCurrentWeek = !($routeParams.hasOwnProperty("timestamp"));

            if($routeParams.focus){
                window.setTimeout(function() {
                    $('body').scrollTop($('#'+$routeParams.focus).offset().top - 80);
                },500);
            }


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