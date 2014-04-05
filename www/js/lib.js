function extendMenu(){
    $("#extendMenu").slideToggle(function() {
        if($(this).css('display') == "none"){
            $(".menu-icon:first").parent().removeClass("selected");
		    var pageWithUpdateSelected = ["#/tenders", "#/tendersHistory", "#/tendersTrip"];
		    if (pageWithUpdateSelected.indexOf(window.location.hash) >= 0 ) {
				$(".update-icon:first").parent().addClass("selected");
		    } 
        }
        else
        {
            $(".menu-icon:first").parent().addClass("selected");
		    $(".update-icon:first").parent().removeClass("selected");
        }
    });
}

function tenders(){
	if($(".update-icon:first").parent().hasClass("selected")){
		//changeURL("#/profile");
	}else{
		changeURL("#/tenders");
	}
}

function tendersAcceptButton () {
	if (confirm("ACCEPT TENDER?")) {
		$('#accept').toggle();
		$('#reject').toggle();
		$('#accepted').toggle();
	}
}

function tendersRejectButton () {
	confirm("REJECT TENDER?");
}

function checkEmail(input){
	var test = input;
	var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
		if(pattern.test(input)){
			return true;
		}else{
			return false;
		}
}
/*
get Date long format:
"Thuesday, 12/24/98"
*/
function getDateLongFormat(timestamp) {
	if (!timestamp) {return ""};
	return getWeekDay(timestamp) + ', ' + getDateFormat(timestamp);
}
/*
get Date short format:
"12/24"
*/
function getDateShortFormat(timestamp) {
	if (!timestamp) {return ""};
	var s = getDateFormat(timestamp);
	return s.split('/')[0] +'/'+ s.split('/')[1];
}
/*
return the day of the week from timestamp
*/
function getWeekDay (timestamp) {
	if (!timestamp) {return ""};
	var date = new Date(timestamp);
	var week = ["Monday","Thuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	
	return week[date.getDay()];
}
/*
get date format "mm/dd/yyyy" from timestamp
*/
function getDateFormat(timestamp) {
	if (!timestamp) {return ""};
	var d = getTimezonedTime(timestamp);

	d = d.toISOString().split('T')[0]; // "2001-12-23"
	d = d.split('-');

	return d[1] +'/'+d[2]+'/'+d[0];
}
/*
return the hour format: "10:23 AM" from timestamp
*/
function getHour (timestamp) {
	if (!timestamp) {return ""};
	var d = getTimezonedTime(timestamp);
	d = d.toISOString();

	d = d.substr(11,5);
	if (d.substr(0,2) <= 12){
		d = d + " AM";
	}else{
		d = d.substr(0,2)-12 + d.substr(2) + " PM";
	}
	return d;

	// var d = getTimezonedTime(timestamp);
	// d = d.toLocaleTimeString("en-US");

	// return  d.split(':')[0] +':'+ d.split(':')[1] + d.split(':')[2].substr(2);
}
/*
Get a timestamp = X Hour in utc 
return date object with
timestamp = X Hour in local timezone
*/
function getTimezonedTime(timestamp) {
	var d = new Date();
	return new Date(timestamp - (d.getTimezoneOffset() * 60000));
}
/*
Return the "week_ending" of the dashboard API
*/
var getWeekEndingParam=function(timestamp) {
    // var dayDuration = 60 * 60 * 24 * 1000;

    // for (var i = 0; i <= 6; i++) {
    //     var date = new Date(timestamp);
    //     if(date.getDay() == 6){
    //         break;
    //     }else{
    //         timestamp -= dayDuration;
    //     }
    // }
    timestamp = parseInt(timestamp);
    return getOffsetDate(timestamp).toISOString().split('T')[0];
};
/*
renvoie une date dont l'heure est réglée sur le Central standard/daylight time
*/
function getOffsetDate(timestamp) {
  // Get local date object
  var d = new Date(timestamp);
  // Add local time zone offset to get UTC and 
  // Subtract offset to get desired zone
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset() - getCstOffset());
  return d;
}

function getCstOffset() {
	return 360;
}

/*
Return a STRING of the driver list as formated as dashboard api
*/
function getDriversIDList() {
    var driver = getCurrentDriver();
    var id = driver.id;
    if(driver.id == -1){
        var list = [];
        for (var i = 0; i < getInfo().driver.length; i++) {
            list.push(getInfo().driver[i].id);
        }
        id = list.join(',');
    }
    return id;
}
/**
 * show popup with error the redirect if needed
 * @param  {JSON} data 
 */
function displayErrorThenRedirect(data) {
	alertOkFct(data.errorMsg.join(" - "),function() {
		if(data.errorRedirect){
			changeURL(data.errorRedirect);
		}
	});
}

/**
 * handel error from API
 * @param  {JSON}   data         
 * @param  {Function} callback     
 * @param  {Function}   errorFailure 
 */
function errorHandling(data, errorFailure, callback) {

	// Failure
	if(!(data.success)){
		if(errorFailure == null){
			displayErrorThenRedirect(data);
		}else{
			errorFailure(data);
		}
	
	// Warning
	}else if(data.errorType == "Warning"){
		displayErrorThenRedirect(data);
		callback();

	// Redirect
	}else if(data.errorType == "Redirect"){
		if(data.errorMsg.lenght != 0){
			displayErrorThenRedirect(data);
		}else{
			changeURL(data.errorRedirect);
		}

	// Normal
	}else{
		callback();
	}
}

function executeRequest(viewID, config, cache, $scope, $http, callback, errorFailure) {

	errorFailure = typeof errorFailure !== 'undefined' ? errorFailure: function(data) {
		displayErrorThenRedirect(data);
	};

	if ( checkConnection() && lastCache(viewID) > CST.cacheTime) {
		$('.loadingView').css("visibility","visible");
		$http({
			method: 'GET',
			url: urls(viewID),
			params: config ,
			headers: {'Accept': 'application/json'},
			cache: cache
		}).success(function(data) {
			data = parseJSON(data); // replace null values by ""

			errorHandling(data, errorFailure, function() {
				callback(data, $scope);
				cacheData(viewID,data);
			});
			$('.loadingView').css("visibility","hidden");

		}).error(function(data,status,headers,config){
			$('.loadingView').css("visibility","hidden");
			alertOk("Could not reach the server.");
		});

	}else{
		data = getCachedData(viewID);
		callback(data, $scope);
	}
}

function checkConnection() {
	try{
		value = navigator.connection.type != Connection.NONE;
	}catch(e){
		value = false;
	}
	return value;
}

function cacheData(viewID,data){
	var value = [new Date().getTime(), data];
	window.localStorage.setItem(viewID, JSON.stringify(value));
}

function getCachedDataNoCheck(viewID){
	cache = window.localStorage.getItem(viewID);
	cache = JSON.parse(cache);
	if ( cache == null ){
		return null;
	}
	return cache[1];
}

function getCachedData(viewID){
	cache = window.localStorage.getItem(viewID);
	cache = JSON.parse(cache);
	if ( cache == null ){
		alert('No Internet');
	}
	return cache[1];
}

function lastCache(viewID){
	cache = window.localStorage.getItem(viewID);

	if (cache != null){
		cache = JSON.parse(cache);
		delta = new Date().getTime() - cache[0];
	}else{
		delta = 9999999999;
	}
	
	return delta;
}

function isDefaultMailSet() {
	cache = window.localStorage.getItem("defaultMail");
	cache = JSON.parse(cache);
	return cache != null;
}
function setDefaultMail(defaultMail) {
	cacheData('defaultMail',defaultMail);
}
function getDefaultMail() {
	cache = window.localStorage.getItem("defaultMail");
	return JSON.parse(cache)[1];
}

function isNotAccepted() {
	cache = window.localStorage.getItem("tosAcceptation");
	cache = JSON.parse(cache);
	if (cache == null) {
		return true;
	}else{
		acceptedVersion = cache[1];
		return !( acceptedVersion == getAppVersion() );
	}
}

function AcceptationDone() {
	cacheData('tosAcceptation',getAppVersion());
}

function getInfo() {
	return getCachedDataNoCheck("userInfo");
}

function getDriverID(){
	return getCachedDataNoCheck('driverID');
}
function setDriverID(id){
	cacheData('driverID',id);
}
function getCurrentDriver() {
	for (var i = 0; i < getInfo().driver.length; i++) {
		driver = getInfo().driver[i];
		if(driver.id == getDriverID()){
			return driver;
		}
	}
	return {
		"lastname" : "Drivers",
		"firstname" : "All",
		"id": -1
	};
}
function changeURLToDefaultPage() {
	var driver = getCurrentDriver();
	if(driver != null && driver.id == -1){
		changeURL('#/dashboard');
	}else{
		changeURL('#/tenders');
	}
}
function changeURL(url){
	if (window.location.hash != url && url != "#/default"){
		$('.noData-box').text("");
		$('.noData-box').css('display',"none");
		
		$('.mainView').fadeOut(CST.timeAnim,function(){
			$('.loadingView').css("visibility","visible");
			window.location.hash = url;
		});
	}else if (url == "#/default") {
		changeURLToDefaultPage();
	}
	if ( currentPageFlow() != url){
		clearPageFlow();
	}
}

function pageReady() {
	$('.loadingView').css("visibility","hidden");
	$('.mainView').fadeIn(CST.timeAnim);
    
    /* For Swiper and Walkthrough */
    var reached_end = false;
    var mySwiper = $('.swiper-container').swiper({
        mode:'horizontal',
        loop: false,
        onTouchEnd: function() {
            if (reached_end)
            {
            	if(sizePageFlow() > 0){
            		nextPageFlow();
        		}else{
                	changeURL("#/tenders");
        		}
            }
            if (mySwiper.activeIndex == 2)
            {
                reached_end = true;
            }
        }
    });
    
    /* For login window */
    $('.input_email').click(function() {
        $(this).find('input').focus();
    });
    $('.input_password').click(function() {
        $(this).find('input').focus();
    });
    
    /* For Hot Comments */
    $('.comment-ellipsis').dotdotdot({
        callback: function(isTruncated, orgContent) {
            if (isTruncated)
            {
                $(this).parent().find('.toggle-text-yellow').show();
            }
        }
    });

    /* For Hit States */
    $('.hitstate').click(function() {
    	$(this).css('opacity','0.3');
    	var that = $(this);
    	setTimeout(function() {
    		that.css('opacity','1');
    	},100);
    });
}

function popUp(title, content, color, cancelFun, okFun){
	$('.popUp').addClass(color + '-txt');
	$('.popUp > .title').html(title);
	$('.popUp > .content').html(content);
	
	if (cancelFun == null) { cancelFun = function() {}; }
	if (okFun == null) { okFun = function() {}; }

	function closePopup () {
		$('.popUpView').css("visibility","hidden");
		$('.popUp').removeClass(color + '-txt');
		$('#popUpCancel').unbind("click");
		$('#popUpOk').unbind("click");
	}
	$('#popUpCancel').click(function() {
		cancelFun();
		closePopup();
	});
	$('#popUpOk').click(function() {
		okFun();
		closePopup();
	});

	$('.popUpView').css("visibility","visible");
}

function alertNoData(txt) {
	try{
		$('.data-box').css("display","none");
		$('.noData-box').text(txt);
		$('.noData-box').css("display","block");
	}catch(e){
		alert(e);
	}
}
/**
 * show styled popup with one ok button 
 * @param  {String} txt   text to show
 */
function alertOk(txt){
	$('#popUpCancel').css("display","none");
	$('#popUpOk').focus();
	popUp("",txt, "black", null, function() {
		$('#popUpCancel').css("display","table-cell");
	});
}
/**
 * show styled popup with one ok button and execute function
 * @param  {String} txt   text to show
 * @param  {function} okFun function to execute 
 */
function alertOkFct (txt,okFun) {
	$('#popUpCancel').css("display","none");
	$('#popUpOk').focus();
	if (okFun == null) { cancelFun = function() {}; }
	popUp("",txt, "black", null, function() {
		$('#popUpCancel').css("display","table-cell");
		okFun();
	});
}

$(function() {
    FastClick.attach(document.body);
});
/*
log out
*/
function logOut(){
	cacheData('connectionStatut',false);
	clearPageFlow();
	window.localStorage.removeItem('driverID');
	window.localStorage.removeItem("userInfo");
	window.localStorage.removeItem("acceptedTrip");
}
/*
log in
*/
function logIn(data) {
	cacheData('connectionStatut',true);
	data.timeout += new Date().getTime();
	cacheData('userInfo',data);
	setDriverID(data.driver[0].id);
}
/*
return if user session is co
*/
function isConnected() {
	return getCachedDataNoCheck('connectionStatut');
}
/*
Debug alert data
*/
function alertData (data) {
	alert(JSON.stringify(data));
}
/*
Define wich page should be load 
*/
function addPageToPageFlow(page) {
	if(window.flowPages){
		window.flowPages.push(page);
	}else{
		window.flowPages = [page];
	}
}
function nextPageFlow() {
	if(window.flowPages && window.flowPages.length > 0){
		changeURL(window.flowPages[0]);
		window.flowPages.splice(0,1);
	}
}
function clearPageFlow(){
	window.flowPages = [];
}
function currentPageFlow () {
	if(window.flowPages){
		var page = window.flowPages[0];
	}else{
		var page = null;
	}
	return page;
}

function sizePageFlow(){
	if(window.flowPages){
		var size = window.flowPages.length;
	}else{
		var size = 0;
	}
	return size;
}
/*
Accept or reject trip
*/
function tripAcceptation($http,id,action,code,statement, callback) {
    var url=urls("tripAcceptation");

    var sendData={
        'token': getInfo().token,
        'user_foreign_key':getInfo().user_foreign_key,
		"driver_id" : getDriverID(),
		"trip_id": id,
		"action": action,
		"reason":{
			"code": code,
			"statement": statement
		}
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
		alert('error: '+statuts);
	});
}
/*
Give the google maps link depending of the os
(address = json, formated as in api doc)
*/
function getAdressLink(address) {
	var adress = address.number+'+'+address.street+'+'+address.city+'+'+address.state+'+'+address.zipcode;
	
	var uri = "maps:q=";
	if ( device.platform.toLowerCase() == 'android' ){
		// var uri = "http://maps.google.com/maps?q=";
		var uri = "geo:0,0?q=";
	}
	var link = encodeURI(uri + adress);
	return link;
}

function openExternalLink(url,navbar,title,back) {
    var encoded = encodeURIComponent(url);
    var url = '#/externalLink?url='+encoded+'&navbar='+navbar+'&title='+title+'&back='+back;
    changeURL(url);
}

function parseJSON(object)
{
    for (var key in object)
    {
        if ( typeof object[key] == "object" && object[key] !== null )
        {
            parseJSON(object[key]);
        }
        else
        {
            if ( object[key] == null )
            {
                object[key] = "";
            }
        }
    }
    
    return object;
}

/*
get app version
*/
function getAppVersion() {
	/*
	var version = getCachedDataNoCheck("version");
	if(version == null){
	 	return 0;
	}
	return version;
	*/
	/*
	$.ajax({
		type        :"GET",
		url  		:"config.xml",
		dataType 	:"xml",
		success: function(xml) {
			
			$(xml).find("widget").each(function(){
				return $(this).attr("version");
			});
		},
		error:function() {
			return 0;
		}
	});
    */

    return CST.appVersion;

}
