const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('users');
const keys = require('../config/keys');
