const config = {
  algolia: {
   		url: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'
	},
	db: {
	   	host: 'localhost',
	   	port: 27017,
	   	name: 'stories'
 	}
};

module.exports = config;
