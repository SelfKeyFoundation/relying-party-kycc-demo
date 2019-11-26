const request = require('request-promise');
const jwt = require('jsonwebtoken');

class Kycc {
	parseJWT(token) {
		return jwt.decode(token, {complete: true, json: true});
	}

	async fetchApplications(token) {
		if (!token) {
			throw new Error('no token');
		}

		const kyccResponse = await request({
			url:
				'https://dev.instance.kyc-chain.com/api/integrations/v2/applications?fields=id,templateId',
			headers: {
				authorization: `Bearer ${token}`
			},
			json: true
		});
		console.log('XXX', kyccResponse);
		return kyccResponse;
	}
}

module.exports = new Kycc();
