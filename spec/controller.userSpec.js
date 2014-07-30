var superagent = require('superagent')

describe('admin', function() {
    var id = "";
    it('can add user', function(done) {
        superagent.post('http://localhost:3001/users').send({
            name: 'UserTest'
        }).end(function(e, res) {
			expect(res.status).toEqual(200)
            id = res.body._id
            done();
        })
    })
    it("can get list of all users", function(done) {
        superagent.get('http://localhost:3001/users').end(function(e, res) {
			expect(res.status).toEqual(200)
			expect(res.body[0].name).toEqual('UserTest')
			expect(res.body[0]._id).not.toBeUndefined()
            done();
        })
    });
    it('can get detail of specific user', function(done) {
        superagent.get('http://localhost:3001/users/' + id).end(function(e, res) {
			expect(res.status).toEqual(200)
			expect(res.body.name).toEqual('UserTest')
			expect(res.body._id).not.toBeUndefined()
            done();
        })
    });
    it('can updates a user details', function(done) {
        superagent.put('http://localhost:3001/users/' + id).send({
            name: 'UserUpdated'
        }).end(function(e, res) {
			expect(res.status).toEqual(200)
			expect(res.body.message).toEqual('User updated!')
			expect(res.body.message).not.toBeUndefined()
            done();
        })
    });
    it('can check if user was updated', function(done) {
        superagent.get('http://localhost:3001/users/' + id).end(function(e, res) {
			expect(res.status).toEqual(200)
            expect(res.body.name).toEqual('UserUpdated')
			expect(res.body.name).not.toBeUndefined()
            done();
        })
    });
    it('can remove a user', function(done) {
        superagent.del('http://localhost:3001/users/' + id).end(function(e, res) {
			expect(res.status).toEqual(200)
			expect(typeof res.body).toEqual('number')
			expect(res.body).toBeGreaterThan(0);
            done();
        })
    });
});