const config = require('../config');
const kue = require('kue');

const { initializeDB } = require('../models');
const db = initializeDB(config);

const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');

const queue = kue.createQueue({
	disableSearch: false
});

module.exports = ({socketIO}) => {

  queue.on('job enqueue', function(id, type){
    //console.log( 'Job %s got queued of type %s', id, type );
  });
  
  queue.on('job complete', function(id, result){
    kue.Job.get(id, function(err, job){
      if (err) return;
      job.remove(function(err){
        if (err) throw err;
        //console.log('removed completed job #%d', job.id);
        //console.log('rest', result)
      });
    });
  });
  
  const startHash = '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048';
  const endHash = '0000000000000000000000000000000000000000000000000000000000000000';
  
  async function scanChain(data) {
    const direction = data.direction || 'forward';
  
    let scanHash
    if (direction === 'forward') {
      const blockTransaction = await db.BlockTransaction.findOne({
        order: [['block_height', 'DESC']]
      });
  
      const hash = blockTransaction ? blockTransaction.block_hash : 'latest';
      const blockResult = await axios(`https://chain.api.btc.com/v3/block/${hash}`)  
      const {next_block_hash} = blockResult.data.data;
      scanHash = next_block_hash;
    } else {
      const blockTransaction = await db.BlockTransaction.findOne({
        order: [['block_height', 'ASC']]
      });
      const hash = blockTransaction ? blockTransaction.block_hash : 'latest';
      const blockResult = await axios(`https://chain.api.btc.com/v3/block/${hash}`)  
      const {prev_block_hash} = blockResult.data.data;
      scanHash = prev_block_hash;
    }
  
    if (scanHash === endHash) {
      console.log('ABORT start or end of blockchain', scanHash)
      return null
    }
  
    const scanBlockResult = await axios(`https://chain.api.btc.com/v3/block/${scanHash}`)
    const blockTime = moment.unix(scanBlockResult.data.data.timestamp);
    const {height} = scanBlockResult.data.data;
  
    const scanBlockTransactionsResult = await axios(`https://chain.api.btc.com/v3/block/${scanHash}/tx`)
    const {list} = scanBlockTransactionsResult.data.data;
  
    const outputSum = _.sum(list.map(entry => entry.outputs_value));
  
    console.log('CREATE', direction, scanHash, outputSum, blockTime.format())
    console.log('socketIO', socketIO)
    
    const nextBlockTransaction = await db.BlockTransaction.create({
      symbol: 'BTC',
      block_height: height,
      block_hash: scanHash,
      block_output_value: outputSum,
      block_created_at: blockTime.toDate(),
    });
  
    return nextBlockTransaction
  }
  
  queue.process('scan', function(job, done){
    scanChain(job.data).then(res => {
      //console.log('res', (res ? res.id : null))
      done();
    }).catch(err => {
      console.log('ERROR', err)
      done();
    })
  });  
}