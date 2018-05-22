const storiesClient = require('../middlewares/stories');
const Story = require('../models/story');

describe('na na na na na', () => {
	it('batman batman', () => {
		var storyOut = new Story();
		storyOut.story_id = 1;
		storyOut.story_title = "story.story_title";
		storyOut.story_url = "story.story_url";
		storyOut.created_at = "story.created_at";
		storyOut.created_at_i = "story.created_at_i";
		storyOut.author = "story.author";
		storyOut.title = "story.title";
		storyOut.delete = false;
		return storiesClient.save(storyOut).then(x => {
			console.log("x", x);
		});
	});
});