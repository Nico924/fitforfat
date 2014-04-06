function track()
{
    this.trackpoints = new Array();
}

// Trackpoint LAT & LONG in DEGREES
t1 = {lat:51.1329624, lon:4.391393, timestamp: 0}
t2 = {lat:51.1337225, lon:4.3896425, timestamp: 5}
t3 = {lat:3, lon:3, timestamp: 6}


track.prototype.addTp=function(trackpoint)
{
    this.trackpoints.push(trackpoint);
}

track.prototype.distance_meters=function(tp1,tp2){
    lat1 = tp1.lat
    lat2 = tp2.lat
    lon1 = tp1.lon
    lon2 = tp2.lon
    var R = 6371; // km (radius of earth)
    var dLat = this.deg2rad(lat2-lat1)
    var dLon = this.deg2rad(lon2-lon1)
    var lat1 = this.deg2rad(lat1);
    var lat2 = this.deg2rad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return( d*1000)
}

track.prototype.timediff=function(tp1,tp2){
    return tp2.timestamp -tp1.timestamp
}


track.prototype.velocity=function(tp1,tp2){
    dist = this.distance_meters(tp1,tp2);
    dt = this.timediff(tp1,tp2)
    if (dt===0)
        return 0;

    return dist/dt;
}

track.prototype.maxvelocity=function(){
    maxvel = 0;
    for(i=1;i<this.trackpoints.length;i++){
        tp1 = this.trackpoints[i-1];
        tp2 = this.trackpoints[i];
        vel = this.velocity(tp1,tp2)
        if (vel > maxvel){
            maxvel = vel
        }
    }

    return maxvel;
}


// Return an array of velocities over time
track.prototype.velocities=function(){
    var list = new Array()
    for(i=1;i<this.trackpoints.length;i++){
        tp1 = this.trackpoints[i-1];
        tp2 = this.trackpoints[i];
        list.push(this.velocity(tp1,tp2))
    }

    return list;
}

track.prototype.totaltime_miliseconds=function(){
    return  this.trackpoints.map(this.getTime).reduce(function(a, b) { return b - a });
}

track.prototype.getTime=function(trackpoint){
    return  trackpoint.timestamp;
}

track.prototype.totaldistance_meters=function(){
    dist = 0;
    for(i=1;i<this.trackpoints.length;i++){
        tp1 = this.trackpoints[i-1];
        tp2 = this.trackpoints[i];
        dist += this.distance_meters(tp1,tp2)
    }
    return dist;
}

track.prototype.avgvelocity=function(){
    return this.velocities().reduce(function(a, b) { return a + b })/this.totaltime_miliseconds();
}


track.prototype.deg2rad=function(deg) {
    return deg * (Math.PI/180)
}
