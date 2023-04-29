const express = require('express');
const mongoose = require('mongoose');
const rootRouter = require('express').Router();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const validationErrors = require('celebrate').errors;
const users = require('./routes/users');
const cards = require('./routes/cards');
const notFound = require('./routes/notFound');

const errors = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

rootRouter.use('/users', users);
rootRouter.use('/cards', cards);
rootRouter.use('*', notFound);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/', rootRouter);
app.use(validationErrors());
app.use(errors);

app.listen(PORT);
