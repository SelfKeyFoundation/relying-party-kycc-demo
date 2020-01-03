# Login With Selfkey Demo for KYCC users

## Contents

- [Usage](#usage)
- [License](#license)

<a name="usage"></a>

## Usage

### Install
```sh
git clone https://github.com/SelfKeyFoundation/relying-party-kycc-demo.git
cd relying-party-kycc-demo
npm install
npm start
```

### SDK code example

From [routes/lws.js](https://github.com/SelfKeyFoundation/relying-party-kycc-demo/blob/master/routes/lws.js)

```js
const fileProcessor = {
	stream: false,
	process: (file, id) => 'processed file url :)'
};

let kyccUser = await sk.kycc.getKYCCUserDataForToken(token, {
	fileProcessor,
	templateId: LWS_TEMPLATE_ID,
	instanceUrl: KYCC_API_URL
});
```

<a name="license"></a>
## License

[The GPL-3.0 License](http://opensource.org/licenses/GPL-3.0)

Copyright (c) 2018 SelfKey Foundation <https://selfkey.org/>
