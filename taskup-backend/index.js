const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
const port = 3001;

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});