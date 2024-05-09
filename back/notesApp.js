// const http = require('http');
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(notes));
// });

const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); //Middleware que permite a cualquier origen hacer peticiones a la API
//Middleware: son funciones que se ejecutan durante el 
//ciclo de vida de la solicitud al servidor


let notes = [
    {
        "id": 1,
        "content": 'HTML is easy!!!',
        "date": '2019-05-30T17:30:31.098Z',
        "important": true
    },
    {
        "id": 2,
        "content": 'Browser can execute only JavaScript',
        "date": '2019-05-30T18:39:34.091Z',
        "important": false
    },
    {
        "id": 3,
        "content": 'GET and POST are the most important methods of HTTP protocol',
        "date": '2019-05-30T19:20:14.298Z',
        "important": true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(obj => obj.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(obj => obj.id !== id);
    res.status(204).end();
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    const ids = notes.map(obj => obj.id);
    const newId = Math.max(...ids) + 1;
    if (!note || !note.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }
    

    const newNote = {
        id: newId,
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.important !== 'undefined' ? note.important : false
    }

    notes = [...notes, newNote];
    res.status(201).json(newNote);
})

app.use(logger);
//Middleware que se ejecuta para todas las rutas


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
