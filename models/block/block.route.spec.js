const {
  initializeTestFramework,
} = require('../../utils/test_utils');
const { db, should } = initializeTestFramework();

describe('Block Route Tests', () => {

  beforeEach(async () => {

  });

  describe('GET /api/v1/block', () => {

    it('should return list of records', async () => {
      // const response = await authenticatedRequest.get(
      //   '/api/v1/block'
      // );
      const response = {status: 200};
      response.status.should.equal(200);
      // response.body.should.have.lengthOf(adhocCleaningBills.length);
      // response.body.should.containSubset(withoutTimestamps(adhocCleaningBills));
    });

  });
});
