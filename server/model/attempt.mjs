import mongoose from "mongoose"

const attemptsSchema = new mongoose.Schema({
        useremail: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        ipvFour:{
            type: String,
            required: true
        },
        ipvSix:{
            type: String,
            required: true
        },
        machine:{
            type: String,
            required: true
        }
    },
    { timestamps: true })

const Attempt = mongoose.model("attempts", attemptsSchema)
export default Attempt