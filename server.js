// first let's import express
const express = require('express')

const apiRoutes = require('./routes/api')

// start the server app
const app = express()

app.use(express.json())

app.use('/api', apiRoutes)

app.use(function(req, res, next){
    //todo - can't find a matching route
    res.status(404).send('Sorry, not found')
})

app.use(function(err, req, res, next){
    console.log(err)
    res.status(500).send('Server error')
})

const server = app.listen(process.env.PORT || 3000, function(){
    console.log('express server running on port', server.address().port)
})

