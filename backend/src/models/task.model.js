const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["Pending", "Complete"],
        default: "Pending"
    }
}, { timestamps: true })

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel