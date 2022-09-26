import "dotenv/config"
import mongoose from "mongoose"

const connector = new Promise(function(resolve, reject){   
        resolve("Mongoose has connected to MongoDB Atlas.")
        reject("Connection failed! Could not establish port to host.")
    })
const {MONGODB_ATLAS_URI} = process.env
const connection = mongoose.connect(MONGODB_ATLAS_URI,{useNewUrlParser: true,})
    .then(console.log("Awaiting MongoDB Atlas connection..."))
    .catch((err) => console.log("An error occured: %s", err))
    .finally(console.log("You are connected to MongoDB Atlas."))


export default connection