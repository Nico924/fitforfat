function TendersHistoryCtrl($scope, $http, $routeParams){
    /*
    See trip detail button
    */
    $scope.seeTrip=function(id){
        changeURL('#/tendersTripDetail?back=tendersHistory&TripID='+id);
    };
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        if(data.trip.length == 0 && $scope.TENDERSHISTORY.offset == 0){
            alertNoData("No trip history available at this time");
        }else{
            $scope.TENDERSHISTORY.offset += data.trip.length;
            $scope.TENDERSHISTORY.trip.push.apply($scope.TENDERSHISTORY.trip, data.trip);

            for (var i = 0; i < data.trip.length; i++) {
                for (var j = 0; j < data.trip[i].stop.length; j++) {
                    $scope.TENDERSHISTORY.trip[i].stop[j].adressLink = getAdressLink(data.trip[i].stop[j].address);
                }
            }
            $scope.noMoreMessage = "";
        }
        cacheData("tendersHistorySpecial",$scope.TENDERSHISTORY);
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        if ($scope.noMoreMessage == "") {
            $scope.noMoreMessage = "Loading...";

            var error=function(data) {
                if (data.errorMsg == "No trips found") {
                    $scope.noMoreMessage = "No more trip history available";
                }else{
                    alertOk(data.errorMsg.join(" - "));
                }
            };
            var config={
                'token'           :getInfo().token,
                'user_foreign_key':getInfo().user_foreign_key,
                'driver_id'       :getDriverID(),
                'offset'          :$scope.TENDERSHISTORY.offset
            };

            executeRequest("tendersHistory", config, true, $scope, $http, $scope.dataTreatment, error);
        };
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            /* Is mulltiple driver vue */
            $scope.isItAllDriverView = getDriverID() == -1;

            $('.noData-box').css("display","block");
            $scope.noMoreMessage = "";

            if(!$scope.isItAllDriverView){

                if ($routeParams.fromID) {
                    $scope.TENDERSHISTORY = getCachedDataNoCheck("tendersHistorySpecial");
                    
                    window.setTimeout(function() {
                        $('body').scrollTop($('#'+$routeParams.fromID).offset().top - 45);
                    },500);
                }else{
                    $scope.TENDERSHISTORY = {};
                    $scope.TENDERSHISTORY.trip = [];
                    $scope.TENDERSHISTORY.offset = 0;
                    
                    $scope.loadContent();
                }
                
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