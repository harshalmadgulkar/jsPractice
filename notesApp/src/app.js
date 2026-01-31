import express from 'express';
import noteModel from '../models/notes.model.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("NotesApp Server");
});

app.get('/notes/read', async (req, res) => {
    // find all notes from db
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched succesfully",
        notes
    });
});

app.post('/notes/create', async (req, res) => {
    // destructure title and description
    let { title, description } = req.body;
    // create note on db which is asynchrnous so async await used
    const note = await noteModel.create({ title, description });
    // response after note created
    res.status(201).json({
        message: "note created successfully.",
        note
    });
});

app.patch('/notes/update/:index', (req, res) => {
    let { index } = req.params;
    let { description } = req.body;
    notes[index].description = description;
    res.status(200).json({ message: "note updated successfully." });
});

app.delete('/notes/delete/:index', (req, res) => {
    const { index } = req.params;
    delete notes[index];
    res.status(200).json({ message: "note deleted succesfully" });
});

export default app;