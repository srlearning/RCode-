'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const codeSchema = mongoose.Schema({ 

	_id: mongoose.Schema.Types.ObjectId,
	RCode: { type:String, require:true, unique:true },
});

module.exports = mongoose.model('Code', codeSchema);        