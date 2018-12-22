'use strict';

const express = require('express');        
const app = express();                
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const UserRoutes = require('./routes');

mongoose.connect('mongodb://localhost:27017/kikoo');
mongoose.Promise = global.Promise;

const router 	   = express.Router();
const port 	   = process.env.PORT || 3000;

app.get('/',function(req,res){
    res.send('Hello World');
   });

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', UserRoutes);


app.listen(port);

module.exports = app;
