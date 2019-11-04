const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const  app = express();

// parse appliction/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((error, req, res, next) => {
    res.status(422).send({ error: error.message });
});

app.get('/', (req, res) => {
    res.send({hi: 'Bye'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
