const express = require('express');
const userRoutes = require('./routes/login');
const cors = require('cors');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', userRoutes);

// Optional: You can keep this if you want a simple root endpoint
app.get('/', (req, res) => {
  res.send('It works!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});