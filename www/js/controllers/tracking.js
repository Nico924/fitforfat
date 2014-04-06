controllers.controller('TrackingController',['$scope','$http','$location', function($scope,$http,$location) {
	$scope.interpretPosition=function(position){
        var myPos={
            "lat":position.coords.latitude,
            "lon":position.coords.longitude
        };
        var message='Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n';
        helper.showAlert(message,"DEBUG");
        $scope.$apply(function($scope){
            $scope.trackin.addTp(myPos);
            //time
            if($scope.trackin.trackpoints.length>1){
 $scope.current_time=$scope.trackin.totaltime_miliseconds();
                $scope.timing=convertTimeString($scope.current_time);
                //distance
               var dist=$scope.trackin.totaldistance_meters(); $scope.distance=Math.round(dist*10)/10
                //speed
                var velocity=$scope.trackin.avgvelocity();
                $scope.velocity=Math.round(velocity*10)/10
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
    /*
    Control functions
    */
    $scope.start=function(){
        $scope.running=true;
        $scope.watchPosition();
    }
    $scope.stop=function(){
        $scope.running=false;
        clearInterval($scope.interval);
        helper.showAlert("You have won "+$scope.points+" point(s), use them in the reward store");
        $scope.trackin=new track();
    }
    /*
    Handle Mode
    */
    $scope.single=function(){
        $scope.mode="solo";
    }
    $scope.multiple=function(){
        $scope.mode="multiple";
        helper.showAlert("Open a Map to choose sport team mate(s)","Map");
    }
    /*
    Handle start of a challenge
    */
    $scope.startChallenge=function(){
        helper.showAlert("Start Challenge","Challenge");
        //$scope.start();
        //should verify challenge execution
    }
    /*
    Constructor
    */
    $scope.init=function(){
        $scope.mode="solo";
        $scope.challenge=false;
        $scope.numPeople=1;
        $scope.frequency=1000;//ms
        $scope.trackin=new track();
        $scope.running=false;
        $scope.distance=0;
        $scope.points=0;
        $scope.speed=0;
        $scope.timing="0'00''";
        if($location.search().challenge==true){
            $scope.challenge=true;
        }
    }
    $scope.init();
}]);