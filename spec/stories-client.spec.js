const storiesClient = require('../middlewares/stories');

describe('naaaaa', function() {
	it('should list ALL blobs on /blobs GET', done => {
		storiesClient.getByFilter({}).then(x => {
			console.log("x", x);
		}, err => {
			console.log("err", err);
		});
	});
});