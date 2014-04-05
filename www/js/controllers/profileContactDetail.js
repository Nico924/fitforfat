function ProfileContactDetailCtrl($scope, $http){
    
    $scope.clearContactField = function(id) {
        $scope.editedValue.contact[id] = "";
        $('#'+id).focus();
    };
    $scope.clearField = function(id) {
        $scope.editedValue[id] = "";
        $('#'+id).focus();
    };
    
    /*
    Send Edited Values
    */
    sendValues =function(list) {
        var sendData={
            'token'           : getInfo().token,
            'user_foreign_key': getInfo().user_foreign_key,
            'driver_id'       : getDriverID(),
            'changes'         : list
        };
        var config={
            'Content-Type'   : 'application/json',
            'Content-Length' : JSON.stringify(sendData).length.toString()
        };

        var callback = function(data){
            if(data.success){
                alertOk("Profile successfully updated.");
                changeURL("profileContactDetail");
            }else{
                alertOk(data.errorMsg.join(" - "));
                $scope.loadContent();
            }
        };

        $http.post(urls("profileChangeValue"),sendData,config).success(function(data) {
            errorHandling(data,null,function() {
                callback(data);
            });
        }).error(function(data,statuts,header,config){
            alertOk("Could not reach the server.");
        });
    };

    /*
    Make list of value to change
    */
    var makeListOfChangedValue = function() {
        var newVal = $scope.editedValue;
        var oldVal = $scope.PROFILEDETAIL;
        
        var list = [];

        if(newVal.email != oldVal.email){
            list.push({
                 "key"      : "email"
                ,"value"    : newVal.email
            });
        }
        if(newVal.cellphone != oldVal.cellphone){
            list.push({
                 "key"      : "cellphone"
                ,"value"    : newVal.cellphone
            });
        }
        if( newVal.shirt_size != oldVal.shirt_size){
            list.push({
                 "key"      : "shirt_size"   
                ,"value"    : newVal.shirt_size
            });
        }
        if( newVal.contact.name != oldVal.contact.name){
            list.push({
                 "key"      : "contact.name"
                ,"value"    : newVal.contact.name
            });
        }
        if( newVal.contact.phone != oldVal.contact.phone){
            list.push({
                 "key"      : "contact.phone"
                ,"value"    : newVal.contact.phone
            });
        }

        return list;
    };
    /*
    show wich field is empty
    */
    var showEmptyField= function() {
        var newVal = $scope.editedValue;

        if(newVal.cellphone == "" ){
            alertOk("Please fill in the cellphone field.");
        }
        if(newVal.email == "" ){
            alertOk("Please fill in the email field.");
        }
        if(newVal.shirt_size == "" ){
            alertOk("Please fill in the shirt size field.");
        }
        if(newVal.contact.name == "" ){
            alertOk("Please fill in the contact name field.");
        }
        if(newVal.contact.phone == ""){
            alertOk("Please fill in the contact phone field.");
        }
    };
    /*
    Check if all fields are not empty
    */
    var isAllValueFilled = function() {
        var newVal = $scope.editedValue;
        try{
            return newVal.email != ""  && newVal.email != "" &&
            newVal.cellphone != "" && newVal.shirt_size != "" && newVal.contact.name != "" &&
            newVal.contact.phone != "";
        }catch(e){
            return false;
        }
    };
    /*
    Submit change by the user in editing mode
    */
    $scope.submitChange = function() {
        if (isAllValueFilled()) {
            var list = makeListOfChangedValue();
            sendValues(list);
        }else{
            showEmptyField();
        }
    };
    /*
    Toggle the editing mode
    */
    $scope.toggleEditing = function() {
        $scope.isEditing = !$scope.isEditing;
    };
    /*
    Data treatment  
    */
    $scope.dataTreatment=function(data) {
        var u = getInfo();
        var d = getCurrentDriver();
        $scope.isEditable = (u.lastname.toUpperCase()  == d.lastname && 
                             u.firstname.toUpperCase() == d.firstname);

        if (data.contact.name == "" || data.contact.phone == ""){
            data.contact.phone = "";
            data.contact.name = "Not on File";
        }
        data.adressLink = getAdressLink(data.address);
        $scope.PROFILEDETAIL = data;

        $scope.isEditing = false;
        $scope.editedValue = {
            "cellphone"    : $scope.PROFILEDETAIL.cellphone,
            "email"        : $scope.PROFILEDETAIL.email,
            "shirt_size"   : $scope.PROFILEDETAIL.shirt_size,
            "contact"      :{
                "name"  : $scope.PROFILEDETAIL.contact.name,
                "phone" : $scope.PROFILEDETAIL.contact.phone
            }
        };
    };
    /*
    Load content
    */
    $scope.loadContent=function(){
        var config={
            'token'           :getInfo().token,
            'user_foreign_key':getInfo().user_foreign_key,
            'driver_id'       :getDriverID()
        };

        executeRequest("profileContactDetail",config,false, $scope, $http, $scope.dataTreatment);
    };
    /*
    Constructor
    */
    $scope.init=function(){
        
        try{

            $scope.isEditable = false;
            $scope.editedValue = {
                "cellphone"    : "",
                "email"        : "",
                "shirt_size"   : "",
                "contact"      :{
                    "name"  : "",
                    "phone" : ""
                }
            };

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