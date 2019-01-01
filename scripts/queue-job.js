const kue = require('kue');

const queue = kue.createQueue({
	disableSearch: false
});

const kueGetActiveJobIds = () => {
	return new Promise((resolve, recject) => {
		queue.inactive( function( err, ids ) {
			if (err) {
				reject(err)
			} else {
				resolve(ids);
			}
			//console.log('ids', ids.length)
			/*ids.forEach( function( id ) {
				kue.Job.get( id, function( err, job ) {
					//console.log('job', id, job)
				});
			});*/
		});
	});
} 


async function createReverseJob() {

	const jobIds = await kueGetActiveJobIds();
	console.log('ACTIVE', jobIds.length)

	if (jobIds.length === 0) {
		queue
		.create('scan', {direction: 'reverse'})
		.save((res, err) => {
				//process.exit();
			return true
		});
	}

}
async function createForwardJob() {

	const jobIds = await kueGetActiveJobIds();
	console.log('ACTIVE', jobIds.length)

	if (jobIds.length === 0) {
		queue
		.create('scan', {direction: 'forward'})
		.save((res, err) => {
				//process.exit();
			return true
		});
	}

}


setInterval(createReverseJob, 10000)
setInterval(createForwardJob, 60000)

