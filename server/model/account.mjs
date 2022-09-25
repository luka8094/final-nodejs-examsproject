import mongoose from "mongoose"

const accountsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            length: 255
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    },
    { timestamps: true })

const Account = mongoose.model("accounts", accountsSchema)
export default Account