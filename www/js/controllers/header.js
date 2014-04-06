controllers.controller('HeaderController', ['$scope','$http','$location', function($scope,$http,$location) {
	/*
    Constructor
    */
    $scope.init=function(){
        $scope.elementOneSelected="";
        $scope.elementTwoSelected="";
        $scope.elementThreeSelected="";
        if($location.$$path=="/challenge")
            $scope.elementTwoSelected="selected";
        else if($location.$$path=="/store")
            $scope.elementThreeSelected="selected"; 
        else
            $scope.elementOneSelected="selected";
    }
    $scope.init();
}]);