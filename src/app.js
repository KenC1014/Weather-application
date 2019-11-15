const express = require('express')
const path = require('path')
const hbs =  require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// set up path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up static directory to server
app.use(express.static(publicDirPath))

//set up handler bar engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather app',
        name:'Ken Chen'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About this app',
        name:'Ken Chen'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
    title:'Help Page',
    name:'Ken Chen',
    Helptext:'We can help you',
    
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
           error:'You must provide a search term'
       })
   }

   address = req.query.address

   geocode(address,(error,{lat,long,location}={}) => {
    if(error){
        return res.send({error:error})
    }

    forecast(lat,long,(error,forecastData)=>{
        if (error){
            return res.send({error:error})
        }
        res.send({
            forecast:forecastData,
            location:location,
            address:address
        })
    })
})
   
})

app.get('/products',(req,res)=> {
    if(!req.query.search){
         return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send()
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ken',
        errormess: 'Help article Not Found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ken',
        errormess: '404 Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('server is now running on port '+port)
})