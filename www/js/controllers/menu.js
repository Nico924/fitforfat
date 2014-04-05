function MenuCtrl($scope, $http){
    /*
    Link to the URL
    */
    $scope.menuLink=function(url) {
        if(url.substring(0,4) == "http" || url.substring(0,3) == "www"){
            //var ref = window.open(url, '_self', 'location=yes');
            openExternalLink(url,'navbar','','');
        }else{
            changeURL('#/'+url);
        }
    };
    /*
    Data treatment 
    */
    $scope.dataTreatment=function(data) {
        $scope.MENU = data;
        for(var i=0;i<data.values.length;i++){
            if ($scope.MENU.values[i].display.split(':')[0] == "Settings"){
                $scope.MENU.values[i].display = "Settings";
                $scope.MENU.values[i].key = "settings";
            }
            $scope.MENU.values[i].isSelected = ('#/'+$scope.MENU.values[i].key == window.location.hash);
        }
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        var config={
            'token'           :getInfo().token,
            'user_foreign_key':getInfo().user_foreign_key,
            'list_key'        :'CMKI_DA_MENU'
        };
        callback = function(data, $scope) {

        };
        executeRequest("listOfValues", config, true, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        try{
            if(isConnected()){
                $scope.loadContent();
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