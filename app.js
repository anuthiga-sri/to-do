const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const basePath = path.join(__dirname, 'public');

app.use(express.static(basePath));

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'views', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
