class Users {
	constructor() {
		this.lastId = 0;
		this.all = [];
		this.byId = {};
	}

	findAll() {
		return this.all.map(id => this.byId[id]);
	}

	findById(id) {
		return this.byId[id];
	}

	findOneByKyccId(id) {
		return this.findAll().find(user => user.kyccId === id);
	}

	create(data) {
		const id = ++this.lastId;
		this.all.push(id);
		this.byId[id] = {...data, id};
		return this.byId[id];
	}
}

module.exports = new Users();
