const { request, response } = require('express');
const { Note } = require('../models/note.model');


module.exports.createNote = (request, response) => {
    const { title, desc } = request.body;
    Note.create({
        title,
        desc
    })
        .then(note => response.json(note))
        .catch(err => {
            if (err.code === 11000) {
                response.status(400).json({ errors: { title: { message: "Title must be unique." } } });
            } else {
                response.status(400).json({ errors: err.errors });
            }
        });
}

module.exports.getAllNotes = (request, response) => {
    Note.find({})
        .then(notes => response.json(notes))
        .catch(err => response.json(err))
}

module.exports.getOneNote = (request, response) => {
    Note.findOne({ _id: request.params.id })
        .then(note => response.json(note))
        .catch(err => response.json(err))
}

module.exports.updateOneNote = (request, response) => {
    Note.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
        runValidators: true
    })
        .then((updatedNote) => response.json(updatedNote))
        .catch(err => {
            response.status(400).json({ errors: err.errors });
        });
}

module.exports.deleteOneNote = (request, response) => {
    Note.findOneAndDelete({ _id: request.params.id })
        .then((status) => response.json(status))
        .catch((err) => response.status(400).json(err))
}


