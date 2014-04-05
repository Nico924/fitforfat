function ChangeDriverCtrl($scope, $http){
    /*
    Cancel button
    */
    $scope.cancelButton=function () {
        if(sizePageFlow() > 0){
            changeURL("#/login");
            clearPageFlow();
        }else{
            changeURLToDefaultPage();
        }
    }
    /*
    Change the driverID
    */
    $scope.changeDriver=function(id){
        setDriverID(id);
        if(sizePageFlow() > 0){
            nextPageFlow();
        }else{
            changeURLToDefaultPage();
            clearPageFlow();
        }
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        $scope.CHANGEDRIVER = getInfo().driver;
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
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