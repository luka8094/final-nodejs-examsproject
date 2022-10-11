import mongoose from "mongoose"

const userSettingsSchema = new mongoose.Schema({
        id:{
            type: String,
            required: true,
        },
        milestones:{
            type: [],
            required: true
        },
        description:{
            type: String,
            required: false
        },
        settings:{
            type: String,
            required: false
        }
    },
    { timestamps: true })

const UserSettings = mongoose.model("userSettings", userSettingsSchema)
export default UserSettings