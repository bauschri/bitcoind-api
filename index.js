const kue = require('kue');

const server = kue.app.listen(3000, () => {
	const host = server.address().address;
  const port = server.address().port;
	console.log('Starting server listening at http://%s:%s ', host, port);
});