const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profile');
const loginRoutes = require('./routes/loginRoute');
const signupRoutes = require('./routes/signupRoute');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/profile', profileRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});