var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const sk = require('@selfkey/node-lib');
const LWS_TEMPLATE_ID = '5cf4b5b6fc92bd6e67c72f41';
const KYCC_API_URL = 'https://dev.instance.kyc-chain.com';

router.post('/login', async (req, res, next) => {
	const token = req.body.token || req.body.jwt;
	if (!token) {
		return next(new Error('Not token provided'));
	}
	try {
		const fileProcessor = {
			stream: false,
			process: (file, id) => 'processed file url :)'
		};

		let kyccUser = await sk.kycc.getKYCCUserDataForToken(token, {
			fileProcessor,
			templateId: LWS_TEMPLATE_ID,
			instanceUrl: KYCC_API_URL
		});

		let user = Users.findOneByKyccId(kyccUser.id);
		if (!user) {
			user = Users.create({
				kyccId: kyccUser.id,
				firstName: kyccUser.attributes.firstName.data,
				lastName: kyccUser.attributes.lastName.data,
				email: kyccUser.attributes.email.data
			});
		}
		req.session.userID = user.id;
		return res.json({redirectTo: '/me/info'});
	} catch (error) {
		console.error('LWS LOGIN ERROR', error);
		return next(new Error('Could not login with provided token'));
	}
});

module.exports = router;
