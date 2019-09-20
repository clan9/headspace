const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const app = express();

// connect to database
connectDB();

// setup middleware
app.use(helmet());
app.use(express.json());

// setup route handlers
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user', userRouter);

// setup static files for hosting
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like main.js or main.css file
  app.use(express.static('client/build'));

  // Express will serve up index.html file
  // if it doesn't recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
