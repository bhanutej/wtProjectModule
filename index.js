const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Project');
require('./models/ProjectProfile');
require('./models/ProjectProfilePage');
require('./models/ProjectVariable');
require('./models/ProjectAlert');
require('./models/projectService');
require('./models/projectDataSocket');
const keys = require('./config/keys');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const projectProfileRoutes = require('./routes/projectProfileRoutes');
const projectProfilePageRoutes = require('./routes/projectProfilePageRoutes');
const projectVariableRoutes = require('./routes/projectVariableRoutes');
const projectAlertRoutes = require('./routes/projectAlertRoutes');
const projectServiceRoutes = require('./routes/projectServiceRoutes');
const projectDataSocketRoutes = require('./routes/projectDataSocketRoutes');

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
projectProfilePageRoutes(app);
projectVariableRoutes(app);
projectAlertRoutes(app);
projectServiceRoutes(app);
projectDataSocketRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
