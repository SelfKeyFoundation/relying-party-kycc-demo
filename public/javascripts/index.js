/* global lws */

const config = {
	ui: {
		el: '#lws'
	},
	website: {
		name: 'LWS Example',
		url: 'http://localhost:3000/',
		termsUrl: 'http://localhost:3000/terms.html',
		policyUrl: 'http://localhost:3000/policy.html'
	},
	rootEndpoint: 'https://dev.instance.kyc-chain.com/api/v2',
	endpoints: {
		'/users/token': '/auth/token',
		'/users/file': '/files',
		login: 'http://localhost:3000/lws/login'
	},
	attributes: [
		{
			description: 'Your phone number (including country code)',
			id: '5cf4b5b6fc92bd26dec72f44',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/phone-number.json',
			title: 'Phone Number',
			label: 'Phone Number'
		},
		{
			description:
				'Your Address: Enter the information as it appears on your government-issued document (street address, city, postal code).',
			id: '5cffb7ed691344744cbb021d',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/physical-address.json',
			title: 'Your Address',
			label: 'Your Address'
		},
		{
			description: 'FIrst name',
			id: '5d076f0a315423134405cbc4',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/first-name.json',
			title: 'First Name',
			label: 'First Name'
		},
		{
			description: 'Last name',
			id: '5d076f20315423f5db05cbc6',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/last-name.json',
			title: 'Last Name',
			label: 'Last Name'
		},
		{
			description: 'Your email address',
			id: '5d13577f72089544cb86cda7',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/email.json',
			title: 'Email Address',
			label: 'Email Address'
		},
		{
			description: 'Birthdate',
			id: '5d14a3b4a67fc45f980e51fd',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/date-of-birth.json',
			title: 'Birthdate',
			label: 'Birthdate'
		},
		{
			description:
				'Please submit a clear and legible copy of the front page of your Passport.',
			id: '5cf4b5b6fc92bda18bc72f46',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/passport.json',
			title: 'Your Passport',
			label: 'Your Passport'
		},
		{
			description:
				'Please submit a clear and legible copy of your Bank Statement, Utility Bill, or any other government-issued document showing your full name and residential address.',
			id: '5cffb6326913442272bb01a6',
			required: true,
			schemaId: 'http://platform.selfkey.org/schema/attribute/bank-statement.json',
			title: 'Proof of Address',
			label: 'Proof of Address'
		}
	],
	did: true,
	meta: {
		templateId: '5cf4b5b6fc92bd6e67c72f41'
	}
};

lws.init(config);
