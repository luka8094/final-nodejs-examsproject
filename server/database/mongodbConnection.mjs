import "dotenv/config"
import mongoose from "mongoose"

const {MONGODB_ATLAS_URI} = process.env
const connection = mongoose.connect(MONGODB_ATLAS_URI,
    {
        useNewUrlParser: true,
    }).then(console.log("Mongoose MongoDB Atlas connection established.")).
    catch((err) => console.log("An error occured: %s", err))

export default connection