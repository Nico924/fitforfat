controllers.controller('TrackingController', ['$scope','$http', function($scope,$http) {
	$scope.interpretPosition=function(position){
        var myPos={
            "lat":position.coords.latitude,
            "lon":position.coords.longitude
        };
        addTP($scope.trackin,myPos,position.timestamp);
        $scope.current_time=elapsedTime_s();
    }
    $scope.handleErrorPosition=function(error){
        helper.showAlert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
    }
    $scope.watchPosition=function(){
        
        setInterval(function(){
            var watchID = navigator.geolocation.getCurrentPosition($scope.interpretPosition,$scope.handleErrorPosition);
        },$scope.frequency)
    }
    $scope.start=function(){
        $scope.running=true;
        $scope.watchPosition();
    }
    $scope.stop=function(){
        $scope.running=false;
    }
    /*
    Constructor
    */
    $scope.init=function(){
        $scope.frequency=500;//ms
        $scope.trackin=new track();
        $scope.running=false;
        $scope.distance=0;
        $scope.points=0;
        $scope.speed=0;
        $scope.timing="0'00''";
        console.log($scope.running);
        
    }
    $scope.init();
}]);