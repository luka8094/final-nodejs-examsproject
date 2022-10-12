import mongoose from "mongoose"

const userSettingsSchema = new mongoose.Schema({
        id:{
            type: String,
            required: true,
        },
        milestones:{
            type: Array,
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