import mongoose from "mongoose"
const userSettingsSchema = new mongoose.Schema({
    milestones:{
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    preferences:{
        type: String,
        required: false
    }
},
{ timestamps: true })

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
        },
        role:{
            type: String,
            required: true
        },
        userSettings: userSettingsSchema
    },
    { timestamps: true })
    
const Account = mongoose.model("accounts", accountsSchema)
export default Account