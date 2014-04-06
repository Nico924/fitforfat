controllers.controller('TrackingController',['$scope','$http','$location', function($scope,$http,$location) {
        $scope.interpretPosition=function(position){
        var myPos={
            "lat":position.coords.latitude,
            "lon":position.coords.longitude
        };
        console.log(position);
        var control=true;
        if($scope.trackin.trackpoints.length>1){
            control=$scope.trackin.control(myPos,$scope.multiplier*position.accuracy);
        }
        if(control){
            $scope.$apply(function($scope){
                
                $scope.trackin.addTp(myPos);
                //time
                if($scope.trackin.trackpoints.length>1){
    // $scope.current_time=$scope.trackin.totaltime_miliseconds();

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

    }
    $scope.handleErrorPosition=function(error){
        helper.showAlert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
    }
    $scope.watchPosition=function(){
        $scope.interval=setInterval(function(){
            var watchID = navigator.geolocation.getCurrentPosition($scope.interpretPosition,$scope.handleErrorPosition,{ enableHighAccuracy: true });
        },$scope.frequency)
    }
    /*
    Control functions
    */

    $scope.start=function(){
        $scope.current_time = 0
        $scope.running=true;
        $scope.watchPosition();
        $scope.startTime = Date.now();
        $scope.chrono = setInterval(function(){
        $scope.$apply(function($scope){
            $scope.current_time= Date.now() - $scope.startTime;
       $scope.timing=convertTimeString($scope.current_time); 
            });
        },1000);
    }

    $scope.stop=function(){
        $scope.running=false;
        clearInterval($scope.interval);
        clearInterval($scope.chrono);
        helper.showAlert("You have won "+$scope.points+" carrot(s), use them in the reward store");
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
        $scope.multiplier=0.3;
        $scope.mode="solo";
        $scope.challenge=false;
        $scope.numPeople=1;
        $scope.frequency=2000;//ms
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
