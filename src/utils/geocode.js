const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2VuMTAxNCIsImEiOiJjazJlNW50bzkwNjI2M2lxdnB6ZDJ2M2VpIn0.OplxgPSMIdOElxYhCSQ1KQ&limit=1'
    request({url,json:true},(error,{body}) => {
       if(error){
            callback('Unable to connect to weather service',undefined)
       }else if(body.features.length === 0){
        callback('Unable to find location, try another search',undefined)
       }else{
        const features = body.features[0]
        const lat = features.center[1]
        const long = features.center[0]
        callback(undefined,{
            lat:lat,
            long:long,
            location:features.place_name
        })
    }
        
    })
}

module.exports = geocode