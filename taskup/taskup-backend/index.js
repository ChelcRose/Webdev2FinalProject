const express = require('express');
const profileRoutes = require('./routes/profile');
const loginRoutes = require('./routes/login');
const cors = require('cors');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', profileRoutes);
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
  res.send('It works!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});