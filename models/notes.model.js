const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userID: { type: String },
}, {
    versionKey: false
});

const NotesModel = mongoose.model('Note', noteSchema);

module.exports = NotesModel;