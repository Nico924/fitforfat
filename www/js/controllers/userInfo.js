function UserInfoCtrl($scope, $http){
    /*
    Load content
    */
    $scope.loadContent=function(){
        $scope.USER = getInfo();
        $scope.DRIVER = getCurrentDriver();
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            if(isConnected()){
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