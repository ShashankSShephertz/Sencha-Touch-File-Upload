function setUserLogin(App42Obj){
    $.session.clear();
    var getObj = JSON.parse(App42Obj),
    getUser = getObj.app42.response.users.user.userName,
    getSession = getObj.app42.response.users.user.sessionId;
    $.session.set("userName" ,getUser);
    $.session.set("session" ,getSession);
}

function getCurrentLocation(popup){
    var geoLocation = Ext.create('Ext.util.Geolocation', {
        id:'geo',
        autoUpdate:false,
        listeners: {
            locationupdate: function (geo) {
                console.log("Get location successfully :--")
                codeLatLng(geo.getLatitude(), geo.getLongitude(),popup)
            },
            locationerror:function (geoe, bTimeout, bPermissionDenied, bLocationUnavailable, message){
                console.log("location error with : -" + message)
            }
        }
    })
    return geoLocation;
}

function codeLatLng(lat, lng,popup) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                //formatted address
                popup.setMasked(false);
                var label = popup.down('#albumOwnerName');
                label.setValue(results[0].formatted_address)
                //find country name
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
        

            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}
  
function getListView(){
    Ext.define('Contact', {
        extend: 'Ext.data.Model',
        config: {
            fields: ['description','name','type','userName','url','tinyUrl']
        }
    });
    var store = Ext.create('Ext.data.Store', {
        model: 'Contact',
        sorters: 'userName'

    });
    return store;
  
}
  
function createTpl(){
    var detailViewTpl = Ext.create('Ext.XTemplate',
    "<img src ={tinyUrl} alt='Smiley face' height='100' width='100' /><div class='my'>{description}</div>");
    return detailViewTpl;
}
  
