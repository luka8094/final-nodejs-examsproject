import mongoose from "mongoose"

const chatlogsSchema = new mongoose.Schema({
        room: {
            type: String,
            required: true
        },
        log: {
            type: Array,
            required: true,
            select: false
        }
    },
    { timestamps: true })

const Chatlog = mongoose.model("chatlogs", chatlogsSchema)
export default Chatlog