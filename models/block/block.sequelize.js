'use strict';
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define('Block', {
    block_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    block_hash: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    block_version: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_hashmerkleroot: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    block_ntime: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_nbits: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_nnonce: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_height: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    prev_block_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    search_block_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_chain_work: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    block_value_in: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_value_out: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_total_satoshis: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_total_seconds: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_satoshi_seconds: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_total_ss: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_num_tx: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    block_ss_destroyed: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'block',
    hooks: {
      async beforeCreate(refund) {

      },
      async afterCreate(refund) {

      },
      async beforeUpdate(refund) {

      },
      async afterUpdate(refund) {

      },
      async afterDestroy(refund) {

      },
    },

  });

  Block.associate = function(models) {

  };
  return Block;
};
