function LoginCtrl($scope, $http){
    /*
    callback of the submit function
    */
    var callback = function (data) {
        if(data.success && data.errorMsg.length == 0){
            if (!isDefaultMailSet() || getDefaultMail() != $scope.inputEmail) {
                setDefaultMail($scope.inputEmail);
            }
            logIn(data);
            
            if (isNotAccepted()){
                addPageToPageFlow("#/terms");
                addPageToPageFlow("#/walkThrough");
            }
            if(data.multiple){
                addPageToPageFlow("#/changeDriver");
            }
            addPageToPageFlow("#/default");
            
            nextPageFlow();
        }else{
            alertOk(data.errorMsg.join(" - "));
            $scope.inputPassword="";
        }
    };
    /*
    Submit the login information
    */
    $scope.submitLogin=function(){
        if($scope.emailValidation){
            var url=urls("login");
            
            var sendData={
                'email':$scope.inputEmail.toLowerCase(),
                'password':$scope.inputPassword,
                'device_id':device.uuid,
                'device_token':getCachedDataNoCheck("deviceToken"),
                'os':device.platform.toLowerCase(),
                'ui_app_version':getAppVersion()
            };
            
            var config={
                'Content-Type'   : 'application/json',
                'Content-Length' : JSON.stringify(sendData).length.toString()
            };
            
            $http.post(url,sendData,config).success(function(data) {
                errorHandling(data,null,function() {
                    callback(data);
                });
            }).error(function(data,statuts,header,config){
                alertOk("Unable to reach the server.");
            });
            
        }else{
            alertOk("Please enter a valid email address.");
            //$scope.inputEmail="";
        }
    };
    /*
    Check if the mail adress is valide
    */
    $scope.checkEmail=function(){
        $scope.emailValidation = checkEmail($scope.inputEmail);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            if(isConnected()){
                logOut();
            }
            $scope.inputPassword="";
            // $scope.inputPassword="welcome1";
            $scope.emailValidation = true;
            if (isDefaultMailSet()) {
                $scope.inputEmail = getDefaultMail();
            }else{
                $scope.inputEmail = "";
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