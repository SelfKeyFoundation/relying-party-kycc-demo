var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const kycc = require('../kycc');
const LWS_TEMPLATE_ID = '5cf4b5b6fc92bd6e67c72f41';

router.post('/login', async (req, res, next) => {
	const token = req.body.token || req.body.jwt;
	if (!token) {
		return next(new Error('Not token provided'));
	}
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXx');
	try {
		let kyccUser = await kycc.login(token);
		// TEST GET APPLICATIONS
		const {payload} = kycc.parseJWT(token);
		console.log('XXX TOKEN PAYLOAD', payload);
		try {
			const applications = await kycc.fetchApplications(LWS_TEMPLATE_ID, kyccUser._id);
			console.log('XXX', 'KYCC Applications', applications);
			if (applications.length) {
				const application = await kycc.fetchApplicationDetails(applications[0].id);
				console.log('XXX', application);
			}
		} catch (error) {
			console.error('XXX', 'KYCC Applications ERROR', error);
		}

		// TEST

		let user = Users.findOneByKyccId(kyccUser._id);
		if (!user) {
			user = Users.create({kyccId: kyccUser._id, name: `test ${Math.random()}`});
		}
		req.session.userID = user.id;
		return res.json({redirectTo: '/me/info'});
	} catch (error) {
		console.error('Token parse', error);
		return next(new Error('Invalid token provided'));
	}
});

module.exports = router;
