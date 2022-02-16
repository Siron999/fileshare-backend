import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalFileName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    fileName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const File = mongoose.model('File', fileSchema);

export default File;
