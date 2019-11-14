const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/73806c76d28d9e02ccbc073ede715dfe/'+ lat +','+ long + '?units=si'

    request({url,json:true},(error,{body}) => {
        
            if(error){
                callback('Unable to connect to weather service',undefined)
            }else if(body.error){
                callback('Unable to find location, try another search',undefined)
            }else{
                const data = body.currently
                callback(undefined,body.daily.data[0].summary+" It is currently "+ data.temperature +" degrees out. There is a "+data.precipProbability+"% to rain.")
                                 
            }
            
         })
}

module.exports = forecast