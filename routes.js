const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Code = require('./models/rcode');

router.post('/create', (req, res, next) => {
	const count = req.body.n;
	var i;
	for (i = 0; i < count; i++) { 
		const newCode = new Code({
		_id: new mongoose.Types.ObjectId(),
		RCode: Math.random().toString(36).replace('0.', '') 
	});
	newCode.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Code Created' 
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	}
});



module.exports = router;
