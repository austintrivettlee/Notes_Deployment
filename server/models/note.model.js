const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Title Required"],
                minlength: [2, "Title must be longer than 2 characters"],
                unique: true
        },
        desc: {
                type: String,
                required: [true, "Description Required"],
                maxlength: [255, "Description cannot exceed 255 characters"]
        }
}, { timestamps: true });
module.exports.Note = mongoose.model('Note', NoteSchema);

