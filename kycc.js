const request = require('request-promise');
const jwt = require('jsonwebtoken');

const KYCC_API_URL = 'https://dev.instance.kyc-chain.com';
const KYCC_API_KEY = 'test';
class Kycc {
	parseJWT(token) {
		return jwt.decode(token, {complete: true, json: true});
	}

	async login(token) {
		const user = await request({
			url: `${KYCC_API_URL}/api/v2/auth/login`,
			method: 'POST',
			body: {
				jwt: token
			},
			json: true
		});
		return user.user;
	}

	async fetchApplications(templateId, userId) {
		const applications = await request({
			url: `${KYCC_API_URL}/integrations/v2/applications?fields=id,owners,template&template_id=${templateId}`,
			headers: {
				apiKey: KYCC_API_KEY
			},
			json: true
		});
		console.log('XXX User id', userId);
		if (applications && userId) {
			return applications.items.filter(application => {
				if (userId && !application.owners.find(owner => owner._id === userId)) {
					return false;
				}
				return true;
			});
		}
		return applications.items;
	}

	async fetchApplicationDetails(applicationId) {
		const application = await request({
			url: `${KYCC_API_URL}/integrations/v2/applications/${applicationId}`,
			headers: {
				apiKey: KYCC_API_KEY
			},
			json: true
		});
		console.log('XXX', application);
		return application;
	}
}

module.exports = new Kycc();
