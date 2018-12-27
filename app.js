'use strict';

const express = require('express');        
const app = express();                
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const UserRoutes = require('./routes');
const Code = require('./models/rcode');

mongoose.connect('mongodb://localhost:27017/Kikoo');
mongoose.Promise = global.Promise;

const router 	   = express.Router();
const port 	   = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', UserRoutes);


app.listen(port);

module.exports = app;
