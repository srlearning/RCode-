'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (RCode,CName,PName,DOB,Pincode,Email,Mobile,Password) => 

	new Promise((resolve,reject) => {

	    const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(Password, salt);

		const newUser = new user({

            RCode: RCode,
            CName: CName,
            PName: PName,
            DOB: DOB,
            Pincode: Pincode,
            Email: Email,
            Mobile: Mobile,
			Password: hash
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});