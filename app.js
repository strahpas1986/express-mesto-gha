const express = require('express');
const mongoose = require('mongoose');
const rootRouter = require('express').Router();
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

rootRouter.use('/users', users);
rootRouter.use('/cards', cards);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64418e5801ce389d8386b27e',
  };
  next();
});

app.use('/', rootRouter);

app.listen(PORT);
