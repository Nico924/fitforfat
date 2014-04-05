function TendersCtrl($scope, $http, $routeParams){
    /*
    Accept tender
    */
    $scope.acceptTender=function(id){
        popUp('accept tender?','','green', null , function(){
            tripAcceptation($http,id,"accept","","", function(data){
                if(data.success){
                    cacheData("acceptedTrip",id);
                    $('#accept').toggle();
                    $('#reject').toggle();
                    $('#accepted').toggle();
                }else{
                    alertOk(data.errorMsg.join(" - "));
                }
            });
        });
    };
    /*
    Reject tender
    */
    $scope.rejectTender=function(id){
        popUp('reject tender?','','red',null , function(){
            changeURL('#/rejectReason?TripID='+id);
        });
    };
    /*
    See trip detail button
    */
    $scope.seeTrip=function(id){
        changeURL('#/tendersTripDetail?back=tenders&TripID='+id);
    };
    
    /* EXPAND HOT COMMENT */
    $scope.expandHotComment=function($event) {
        $($event.target).parent().find('.comment-ellipsis').toggle();
        $($event.target).parent().find('.comment-full').toggle();
        
        if ($($event.target).text() == "SHOW MORE"){
            $($event.target).text("SHOW LESS");
        }else{
            $($event.target).text("SHOW MORE");
        }
    }
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        if(data.trip.length == 0){
            alertNoData("No trip available at this time");
        }else{
            $scope.TENDERS = data;
            for (var i = 0; i < data.trip.length; i++) {
                for (var j = 0; j < data.trip[i].stop.length; j++) {
                    $scope.TENDERS.trip[i].stop[j].adressLink = getAdressLink(data.trip[i].stop[j].address);
                }
            }
            cacheData("tendersSpecial",$scope.TENDERS);
        }
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

        executeRequest("tenders", config, true, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            /* Is mulltiple driver vue */
            $scope.isItAllDriverView = getDriverID() == -1;
            if(!$scope.isItAllDriverView){

                if ($routeParams.fromID) {
                    $scope.TENDERS = getCachedDataNoCheck("tendersSpecial");
                    
                    window.setTimeout(function() {
                        $('body').scrollTop($('#'+$routeParams.fromID).offset().top - 45);
                    },500);
                }else{
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