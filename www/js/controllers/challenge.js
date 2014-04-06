controllers.controller('ChallengeController', ['$scope','$http', function($scope,$http) {
	/*
    Get My Challenges
    */
    $scope.getMyChallenges=function(){
        $http.get("data/myChallenges.json").success(function(data){
            console.log(data);
            $scope.myChallenges=data; 
        });
    }
    /*
    Get Upcoming Challenges
    */
    $scope.getUpcomingChallenges=function(){
        $http.get("data/upcomingChallenges.json").success(function(data){
            console.log(data);
            $scope.upcomingChallenges=data; 
            if(data.length==0){
                $scope.showNoUp=true;
            }
        });
    }
    /*
    Save the challenge in my challenge
    */
    $scope.joinChallenge=function(challenge){
        challenge.type=1;
        $scope.myChallenges.push(challenge);
        var i;
        for(i=0;i<$scope.upcomingChallenges.length;i++){
            var up=$scope.upcomingChallenges[i];
            if(up.id==challenge.id){
                $scope.upcomingChallenges.splice(i,1);
                break;
            }
        }
        helper.showAlert("The challenge "+challenge.title+" has successfully been added to your challenges");
    }
    /*
    Request more info 
    */
    $scope.moreInfos=function(challenge){
        helper.showAlert("Here is a more complete description of the challenge: "+challenge.description);
    }
    /*
    Execute Challenge
    */
    $scope.executeChallenge=function(challenge){
        if(challenge.peopleRegistered==challenge.capacity){
            window.location.href="#/tracker?tracking=true";
        }
    }
    /*
    Constructor
    */
    $scope.init=function(){
        $scope.showNoUp=false;
        console.log("store");
        $scope.getMyChallenges();
        $scope.getUpcomingChallenges();
    }
    $scope.init();
}]);