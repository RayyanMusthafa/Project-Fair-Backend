// loads .env file into process.env
require('dotenv').config() // loads .env file contents into process.env by default

const express = require('express')

const cors = require('cors')

const db = require('./DB/connection')

const router = require('./Router/route')

// middleware
    const appMiddleware = require('./Middlewares/appMiddleware')

    const jwtMiddleware = require('./Middlewares/jwtMiddleware')


// create a backend application using express
    const pfserver =express()

// use
    pfserver.use(cors())
    pfserver.use(express.json()) // return middleware that pnly parses json
    // pfserver.use(appMiddleware)
    pfserver.use(router)
    // image export from server to client
    pfserver.use('/uploads',express.static('./uploads'))


// port creation 
    const port = 4000 || process.env.port

//server listen
    pfserver.listen(port,()=>{
        console.log('listening port' +port);
    })

//http - get resolving to http://localhost4000 
    pfserver.get('/',(req,res)=>{
        res.send(`<h1>PROJECT FAIR...</h1>`)
    })