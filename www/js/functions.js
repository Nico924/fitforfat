/*
equivalent to range function in python
*/
function range (low, high, step) {
  var matrix = [];
  var inival, endval, plus;
  var walker = step || 1;
  var chars = false;

  if (!isNaN(low) && !isNaN(high)) {
    inival = low;
    endval = high;
  } else if (isNaN(low) && isNaN(high)) {
    chars = true;
    inival = low.charCodeAt(0);
    endval = high.charCodeAt(0);
  } else {
    inival = (isNaN(low) ? 0 : low);
    endval = (isNaN(high) ? 0 : high);
  }

  plus = ((inival > endval) ? false : true);
  if (plus) {
    while (inival <= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival += walker;
    }
  } else {
    while (inival >= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival -= walker;
    }
  }

  return matrix;
}
Array.prototype.indexOfObject=function(elem,index){
    for(var i=0;i<this.length;i++){
        var current=this[i];
        if(elem[(index)?index:"id"]==current[(index)?index:"id"]){
            return i;
        }
    }
    return -1;
}
Array.prototype.getById=function(value,index){
    for(var i=0;i<this.length;i++){
        var current=this[i];
        if(current[(index)?index:"id"]==value){
            return current;
        }
    }
    return -1;
}
Array.prototype.replace=function(newArray){
    this.splice(0,this.length);
    //array is empty now
    for(var i=0;i<newArray.length;i++){
        this.push(newArray[i]);
    }
}
//Variable for the months
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
/*
Function that return a new input object
*/
function input(value,message){
    if(!value)
        value='';
    return {
        'value':value,
        'error':false,
        'required':false,
        'errorMessage':message
    }
}
function getParametersUrl(){
    var url=window.location.href;
    var i=url.indexOf("?");
    if(i<0){
        return {};
    }
    if(url.length>i+1){
        var parameters=url.substr(i+1);
        if(parameters.indexOf("/")>0){
            return {};
        }
        try {
            var parameters=JSON.parse('{"' + decodeURI(parameters).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            return parameters;
        } catch (e) {
            return {};
        }   
    }
    else{
        return {};
    }
}
function scrollTop(elem){
    $("body,html").animate({  
        scrollTop:elem.offset().top-70 
     }, 500);  
}
function scrollTopSearch(){
    var elem=$(".page-tab");
    var top=0;
    if(elem.length==0){
        elem=$(".main-container");
        top=elem.offset().top-70;
    }
    if(elem.length!=0){
        if(top==0)
            top=elem.offset().top+65;
        $("body,html").animate({  
            scrollTop:top
        }, 500);  
    }
}
var print=false;
function log(txt){
    if(print)
        console.log(txt);
}
/*
Fixing IE placeholder
*/
function fixIE(){
    setTimeout(function(){
            $('input, textarea').placeholder();
    },100);
}
/*
Convert time for the user
*/
function convertTimeString(time){
    var seconds=Math.round(time/1000);
    var sec=seconds % 60;
    var min=Math.floor(seconds/60);
    var s=min+"''"+sec+"'";
    return min+"''"+sec+"'";
}
/*
Switch activated
*/
function switchActivated(elem){
    if(!elem.hasClass("selected")){
        var parent=elem.parent();
        parent.find(".selected").removeClass("selected");
        elem.addClass("selected");
    }
}
/*
Change URL
*/
function changeURL(url){
    window.location.hash = url;
}
/*
Compute scopre
*/
function computePoint(speed,distance,numPeople){
        return Math.round(Math.log(numPeople*Math.E)*distance*(speed/2.5));
}