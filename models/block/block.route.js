const route = ({ db, epilogue }) => {
  const resource = epilogue.resource({
    model: db.Block,
    endpoints: ['/block', '/block/:id'],
    pagination: true,
    actions: ['list', 'read'],
  });

  /*
  discountsResource.read.fetch.before(
    importSourceMilestones.includeImportSourceAssociation
  );

  discountsResource.list.fetch.before(
    importSourceMilestones.includeImportSourceAssociation
  );
  discountsResource.list.send.before(
    importSourceMilestones.formatAdjustmentResponse
  );

  discountsResource.update.fetch.after(
    importSourceMilestones.assertRecordNotUsedInProducedStatement
  );
  discountsResource.delete.fetch.after(
    importSourceMilestones.assertRecordNotUsedInProducedStatement
  );
  */

  return resource;
};

module.exports = route;
