controllers.controller('TrackingController', ['$scope','$http', function($scope,$http) {
	$scope.interpretPosition=function(position){
        var myPos={
            "lat":position.coords.latitude,
            "lon":position.coords.longitude,
            "timestamp":position.timestamp
        };
        $scope.$apply(function($scope){
            $scope.trackin.addTp(myPos);
            //time
            if($scope.trackin.trackpoints.length>1){
            $scope.current_time=$scope.trackin.totaltime_miliseconds();
                $scope.timing=convertTimeString($scope.current_time);
                //distance
                $scope.distance=$scope.trackin.totaldistance_meters();
                //speed
                $scope.velocity=$scope.trackin.avgvelocity();
                $scope.speed=$scope.velocity+" m/s";
                $scope.points=computePoint($scope.velocity,$scope.distance,$scope.numPeople);
            }  
        });
    }
    $scope.handleErrorPosition=function(error){
        helper.showAlert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
    }
    $scope.watchPosition=function(){ 
        $scope.interval=setInterval(function(){
            var watchID = navigator.geolocation.getCurrentPosition($scope.interpretPosition,$scope.handleErrorPosition);
        },$scope.frequency)
    }
    $scope.start=function(){
        $scope.running=true;
        $scope.watchPosition();
    }
    $scope.stop=function(){
        $scope.running=false;
        clearInterval($scope.interval);
        helper.showAlert("You have won "+$scope.points+" point(s), use them in the reward store");
    }
    $scope.single=function(){
        $scope.mode="solo";
    }
    $scope.multiple=function(){
        $scope.mode="multiple";
        helper.showAlert("Open a Map to choose sport team mate(s)","Map");
    }
    /*
    Constructor
    */
    $scope.init=function(){
        $scope.mode="solo";
        $scope.numPeople=1;
        $scope.frequency=500;//ms
        $scope.trackin=new track();
        $scope.running=false;
        $scope.distance=0;
        $scope.points=0;
        $scope.speed=0;
        $scope.timing="0'00''";
    }
    $scope.init();
}]);