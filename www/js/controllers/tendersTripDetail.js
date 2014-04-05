function TendersTripDetailCtrl($scope, $http, $http, $routeParams){
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        if(!data.trip || data.trip.length == 0){
            alertNoData("No active trip");
        }else{
            for (var j = 0; j < data.trip[0].stop.length; j++) {
                data.trip[0].stop[j].adressLink = getAdressLink(data.trip[0].stop[j].address);
            }
        }
        $scope.trip = data.trip[0];
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        var config={
            'token'           :getInfo().token,
            'user_foreign_key':getInfo().user_foreign_key,
            'driver_id'       :getDriverID(),
            'trip_id'         :$routeParams.TripID
        };
        executeRequest("tendersTrip", config, true, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            if($routeParams.back){
                $scope.goBack=function(){
                    changeURL('#/'+$routeParams.back+'?fromID='+$routeParams.TripID);
                };
            }else{
                $scope.goBack=function(){
                    changeURL('#/tenders?fromID='+$routeParams.TripID);
                };
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