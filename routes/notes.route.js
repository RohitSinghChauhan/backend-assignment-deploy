const { Router } = require('express');
const NotesModel = require('../models/notes.model');

const notesRoute = Router();

notesRoute.get('/', async (req, res) => {
    const params = req.query.params;

    try {
        const notes = await NotesModel.find(params);
        res.send(notes);
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

notesRoute.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const note = await NotesModel.findById(id);
        res.send(note);
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

notesRoute.post('/create', async (req, res) => {
    const data = req.body;

    try {
        await NotesModel.create(data);
        res.send({ 'msg': 'Note has been created' })
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});


notesRoute.patch('/update/:id', async (req, res) => {
    const noteID = req.params.id;
    const userID = req.body.userID;
    const data = req.body;

    try {
        const note = await NotesModel.findOne({ _id: noteID });
        if (userID !== note.userID) {
            res.send({ 'msg': 'user not authorized' });
        }
        else {
            await NotesModel.findByIdAndUpdate({ _id: noteID }, data);
            res.send({ 'msg': 'User note has been modified' });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

notesRoute.delete('/delete/:id', async (req, res) => {
    const noteID = req.params.id;
    const userID = req.body.userID;

    try {
        const note = await NotesModel.findOne({ _id: noteID });
        if (userID !== note.userID) {
            res.send({ 'msg': 'user not authorized' });
        }
        else {
            await NotesModel.findByIdAndRemove({ _id: noteID });
            res.send({ 'msg': 'User note has been removed' });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ 'err': 'something went wrong' });
    }
});

module.exports = notesRoute;