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

app.get('/todo-create', (req, res) => {
    res.sendFile(path.join(basePath, 'views', 'todo-create.html'))
});

app.get('/admin/todo-list', (req, res) => {
    res.sendFile(path.join(basePath, 'views/admin', 'index.html'))
});

app.get('/admin/reports', (req, res) => {
    res.sendFile(path.join(basePath, 'views/admin', 'reports.html'))
});

app.get('/admin/reports/statistic', (req, res) => {
    res.sendFile(path.join(basePath, 'views/admin', 'reports.html'))
});

app.get('/admin/reports/overdue', (req, res) => {
    res.sendFile(path.join(basePath, 'views/admin', 'overdue.html'))
});

app.get('/admin/reports/late-completion', (req, res) => {
    res.sendFile(path.join(basePath, 'views/admin', 'late-completion.html'))
});

app.use(express.json());
app.use('/api/', routes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
