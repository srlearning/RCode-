'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 

	_id: mongoose.Schema.Types.ObjectId,
	RCode: { type:String, require:true, unique:true },
	CName: { type:String, require:true },
	PName: { type:String, require:true },
	DOB: { type:String, require:true },
	Pincode: { type:String, require:true },
	Email: { type:String, require:true },
	Mobile: { type:String, require:true },
	Password: { type:String, require:true },
});

module.exports = mongoose.model('User', userSchema);        