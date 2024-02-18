const mongoose = require('mongoose')

const connectionString =process.env.DATABASE 

mongoose.connect(connectionString).then(()=>{
    console.log('Connection Mongodb');
})
.catch((error)=>{
    console.log("COnnection ERROR");
})