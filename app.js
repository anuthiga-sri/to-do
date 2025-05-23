const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;
const basePath = path.join(__dirname, 'public');

app.use(express.static(basePath));

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'views', 'index.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(basePath, 'views', 'register.html'))
});

app.get('/todo-list', (req, res) => {
    res.sendFile(path.join(basePath, 'views', 'todo-list.html'))
});

app.use(express.json());
app.use('/api/', routes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
