var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const kycc = require('../kycc');

router.post('/login', async (req, res, next) => {
	const token = req.body.token || req.body.jwt;
	if (!token) {
		return next(new Error('Not token provided'));
	}

	// TEST GET APPLICATIONS

	try {
		const applications = await kycc.fetchApplications(token);
		console.log('XXX', 'KYCC Applications', applications);
	} catch (error) {
		console.error('XXX', 'KYCC Applications ERROR', error);
	}

	// TEST

	try {
		const {payload} = kycc.parseJWT(token);
		if (!payload || !payload.sub) {
			throw new Error('No subject');
		}

		let user = Users.findOneByKyccId(payload.sub);
		if (!user) {
			user = Users.create({kyccId: payload.sub, name: `test ${Math.random()}`});
		}
		req.session.userID = user.id;
		return res.json({redirectTo: '/me/info'});
	} catch (error) {
		console.error('Token parse', error);
		return next(new Error('Invalid token provided'));
	}
});

module.exports = router;
