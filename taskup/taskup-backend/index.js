const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/loginRoute');
const signupRoutes = require('./routes/signupRoute');
const userProfileRoute = require('./routes/userProfileRoute');
const adminProfileRoute = require('./routes/adminProfileRoute');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/userProfile', userProfileRoute);
app.use('/adminProfile', adminProfileRoute);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});