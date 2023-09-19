const NoteController = require('../controllers/note.controller');

module.exports = function(app){
    app.get('/api/notes', NoteController.getAllNotes);
    app.get('/api/notes/:id', NoteController.getOneNote);
    app.post('/api/notes/new', NoteController.createNote);
    app.put('/api/notes/:id/edit', NoteController.updateOneNote);
    app.delete('/api/notes/:id', NoteController.deleteOneNote);
}


