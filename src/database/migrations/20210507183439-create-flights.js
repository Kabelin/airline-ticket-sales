module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('flights', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      origin_id: {
        type: Sequelize.INTEGER,
        references: { model: 'airports', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      destination_id: {
        type: Sequelize.INTEGER,
        references: { model: 'airports', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      remaining_seats: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      quantity_available: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('flights');
  },
};
