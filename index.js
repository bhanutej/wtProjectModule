const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Project');
require('./models/ProjectProfile');
const keys = require('./config/keys');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const projectProfileRoutes = require('./routes/projectProfileRoutes');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

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

authRoutes(app);
projectRoutes(app);
projectProfileRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
