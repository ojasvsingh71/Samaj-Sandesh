import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    dateEnd: {
        type: Date
    }
})

export default mongoose.model("Announcement", announcementSchema);