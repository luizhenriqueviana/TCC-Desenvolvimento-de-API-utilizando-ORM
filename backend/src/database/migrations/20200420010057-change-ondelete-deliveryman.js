'use strict';

module.exports = {
  up: queryInterface => {
    queryInterface.removeConstraint('orders', 'orders_deliveryman_id_fkey');
    return queryInterface.addConstraint('orders', ['deliveryman_id'], {
      type: 'FOREIGN KEY',
      name: 'orders_deliveryman_id_fkey',
      references: { table: 'deliverymans', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: queryInterface => {
    queryInterface.removeConstraint('orders', 'orders_deliveryman_id_fkey');
    return queryInterface.addConstraint('orders', ['deliveryman_id'], {
      type: 'FOREIGN KEY',
      name: 'orders_deliveryman_id_fkey',
      references: { table: 'deliverymans', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },
};
