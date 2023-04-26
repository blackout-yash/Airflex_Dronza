import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    sendAt: {
        type: Date,
        default: Date.now
    }
})

export const message = mongoose.model('message', schema)