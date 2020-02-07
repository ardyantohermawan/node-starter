var request = require('supertest');
var server = require('../index');

// Hooks - Before All
beforeAll(async () => {
});

// Hooks - After All
afterAll(async () => {
	await server.close();
});

// Hooks - Before Each
beforeEach(()=> {
})

describe('GET /', () => {
	it('respond with hello world', function(done) {
		request(server).get('/').expect('hello world', done);
	});
});