var factories = angular.module('factories', []);
factories.factory('formData',function(){
    function formData($scope){
        this.$scope=$scope;
        if(!window.FormData){
            //alert("Your browser does not support FormData, try to update it");
            var data=function(){
                this.content="";
            };
            data.prototype.append=function(name,value){
                if(this.content!=''){
                    this.content+="&";
                }
                this.content+=name+"="+value;
            }
            this.data=new data();
        }
        else{
            this.form=new FormData();
        }
    }
    formData.prototype.setData=function(datas){
        for(data in datas){
            if(typeof datas[data]==='object'){
                console.log(datas[data]);
                if(datas[data].length !=undefined){
                    console.log("array");
                    if(datas[data].length>0){
                        for(var i=0;i<datas[data].length;i++){
                            var elem=datas[data][i];
                            for(key in elem){
                                if(this.form)
                                    this.form.append(data+"["+i+"]["+key+"]",elem[key]);
                                else if(this.data)
                                    this.data.append(data+"["+i+"]["+key+"]",elem[key]);
                            }
                        }
                    }
                }
                else{
                    console.log("json");
                   for(key in datas[data]){
                        if(this.form)
                            this.form.append(data+"["+key+"]",datas[data][key]);
                        else if(this.data)
                            this.data.append(data+"["+key+"]",datas[data][key]);
                    } 
                }
            }
            else{
                if(this.form)
                    this.form.append(data,datas[data]);
                else if(this.data)
                    this.data.append(data,datas[data]);
            }
        }
    }
    formData.prototype.setFile=function(files){
        //var files=fileInput[0].files;
        if(files.length!=0){
            if(this.form)
                this.form.append('file',files[0]);
            //no picture
        }    
    }
    formData.prototype.send=function(url,callback,progressFunction){
        var xhr="";
         try {
            //firefox, chrome, safari etc
            xhr = new XMLHttpRequest();
        }
        catch (e) {
            // Internet Explorer Browsers
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('POST',url); 
        progress={};
        var self=this;
        xhr.onload = function() {
                if (callback && typeof(callback) === "function") { 
                    self.$scope.$apply(function(){
                        var resp="";
                        try {
                            resp=JSON.parse(xhr.response);
                        } catch (ex) {
                            resp=xhr.response;
                        }
                        console.log(resp);
                        callback.call(this,resp);
                    });
                }
        };
        xhr.upload.onprogress = function(e) {
                progress.value = e.loaded;
                progress.max = e.total;
                console.log(progress);
                if (progressFunction && typeof(progressFunction) === "function") {
                    self.$scope.$apply(function(){
                        progressFunction.call(this,progress);
                    });
                }
        };
        if(this.form){
            xhr.send(this.form);
        }
        else{
            console.log(this.data.content);
            xhr.send(this.data.content);
        }
    }
    return  formData;
});