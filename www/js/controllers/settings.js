function SettingsCtrl($scope, $http){    
        
    $scope.init=function(){
        var u = getInfo();
        var d = getCurrentDriver();
        $scope.isEditable = (u.lastname.toUpperCase()  == d.lastname && 
                             u.firstname.toUpperCase() == d.firstname);
        pageReady();
    };
    
    $scope.init();
    $scope.$on('$includeContentLoaded', function(){
        // pageReady();
    });
}