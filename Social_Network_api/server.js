const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const thoughtsRouter = require('./routes/thoughts');
app.use('/api/thoughts', thoughtsRouter);
