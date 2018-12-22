const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('./models/user');

router.post('/signup', (req, res, next) => {

	User.findOne({ RCode: req.body.RCode })
		.exec()
		.then(user => {
			if (user) {
				return res.status(409).json({
					message: 'RCode cannot be repeated'
				});
			}
			else {
				bcrypt.hash(req.body.Password, 10, (err, hash) => {
					console.log("err",err);
					if (err) {
						return res.status(500).json({
							error: err
						});
					}
					else {
						const newUser = new User({
							_id: new mongoose.Types.ObjectId(),
							RCode: req.body.RCode,
							CName: req.body.CName,
							PName: req.body.PName,
							DOB: req.body.DOB,
							Pincode: req.body.Pincode,
							Email: req.body.Email,
							Mobile: req.body.Mobile,
							Password: hash
						});
						newUser.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: 'User Created'
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
			}
		});
});

router.post('/login', (req,res,next) => {
	User.findOne({Email: req.body.Email})  
	.exec()
	.then(user => {
		if(user.length < 1){
			return res.status(401).json({
				message: 'Auth failed'
			});
		}
		if (bcrypt.compareSync(req.body.Password, user.Password)) {
			const token = jwt.sign({
				RCode: user.Rcode,
				Email: user.Email
			}, 'secretkey',
			{
				expiresIn: "1h"
			}
			);
			return res.status(200).json({
				message: 'Auth successful',
				token: token
			});

			} else {

				return res.status(401).json({
					message: 'Auth failed'
				});
			}
		})
	.catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	}); 
});

module.exports = router;
