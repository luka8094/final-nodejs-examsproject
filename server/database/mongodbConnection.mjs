import "dotenv/config"
import mongoose from "mongoose"

const {MONGODB_ATLAS_DB} = process.env
const connection = mongoose.connect(MONGODB_ATLAS_DB).then(console.log("Mongoose MongoDB Atlas connection established.")).catch((err) => console.log("An error occured: %s", err))

export default connection