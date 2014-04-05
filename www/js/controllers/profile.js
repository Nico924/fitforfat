function ProfileCtrl($scope, $http){
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        for(var key in data.date){
            data.date[key] = getDateFormat(data.date[key]);
        }
        data.adressLink = getAdressLink(data.address);
        
        $scope.PROFILE = data;
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
        executeRequest("profile",config,false, $scope,$http,$scope.dataTreatment);

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