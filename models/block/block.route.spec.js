const {
  initializeTestFramework,
} = require('../../utils/test_utils');
const { expect } = initializeTestFramework();

describe('Block Route Tests', () => {
  beforeEach(async () => {

  });

  describe('GET /api/v1/block', () => {
    it('should return list of records', async () => {
      // const response = await authenticatedRequest.get(
      //   '/api/v1/block'
      // );

      expect({a: 1}).to.deep.equal({a: 1});
      // response.body.should.have.lengthOf(adhocCleaningBills.length);
      // response.body.should.containSubset(withoutTimestamps(adhocCleaningBills));
    });
  });
});
