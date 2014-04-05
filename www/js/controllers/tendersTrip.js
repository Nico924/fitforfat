function TendersTripCtrl($scope, $http){
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
        $scope.TENDERSTRIP = data;
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        var config={
            'token'           :getInfo().token,
            'user_foreign_key':getInfo().user_foreign_key,
            'driver_id'       :getDriverID()
        };    
        executeRequest("tendersTrip", config, true, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            /* Is mulltiple driver vue */
            $scope.isItAllDriverView = getDriverID() == -1;
            if(!$scope.isItAllDriverView){
                $scope.loadContent();
            }
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