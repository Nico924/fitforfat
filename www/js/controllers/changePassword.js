function ChangePasswordCtrl($scope, $http){
    /*
    callback of the submit new password
    */
    var callback=function(data){
        if(data.success){
            alertOk("Password successfully changed.");
            changeURL("#/tenders");
        }else{
            alertOk(data.errorMsg.join(" - "));
            $scope.oldPassword="";
            $scope.newPassword="";
            $scope.confirmPassword="";
        }
    };

    /*
    Submit new password to be change
    */
    $scope.submitPassword=function(){
        if($scope.samePassword){
            var url=urls("changePassword");

            var sendData={
                'token': getInfo().token,
                'user_foreign_key':getInfo().user_foreign_key,
                'old_password':$scope.oldPassword,
                'new_password':$scope.newPassword
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
                alertOk("Could not reach the server.");
            });
        }else{
            alertOk("Both password don't match.");
            $scope.newPassword="";
            $scope.confirmPassword="";
        }
    };
    /*
    check if passwords are equal at each typed character.
    */
    $scope.checkConfirm=function(){
        $scope.samePassword = ($scope.newPassword==$scope.confirmPassword);
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        $scope.oldPassword="";
        $scope.newPassword="";
        $scope.confirmPassword="";
        $scope.samePassword = false;
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            $scope.loadContent();
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