controllers.controller('TrackingController', ['$scope','$http', function($scope,$http) {
	/*
    Constructor
    */
    $scope.init=function(){
        //...
        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        function onSuccess(position) {
            var location=$("#location");
            var message = 'Latitude: '  + position.coords.latitude      + ' ' +'Longitude: ' +position.coords.longitude;
            location.html(message);
            //helper.showAlert(message,"");
            
        }

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            helper.showAlert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
        console.log("tracking");
    }
    $scope.init();
}]);