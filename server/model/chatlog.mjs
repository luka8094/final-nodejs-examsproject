import mongoose from "mongoose"

const chatlogsSchema = new mongoose.Schema({
        room: {
            type: String,
            required: true
        },
        log: {
            type: [],
            required: true
        }
    },
    { timestamps: true })

const Chatlog = mongoose.model("chatlogs", chatlogsSchema)
export default Chatlog