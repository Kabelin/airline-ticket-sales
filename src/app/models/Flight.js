import Sequelize, { Model } from 'sequelize';

class Flight extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        remaining_seats: Sequelize.JSONB,
        quantity_available: Sequelize.INTEGER,
        value: Sequelize.FLOAT,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (flight) => {
      if (flight.remaining_seats) {
        flight.quantity_available = flight.remaining_seats.length;
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Airport, {
      foreignKey: 'origin_id',
      as: 'origin',
    });
    this.belongsTo(models.Airport, {
      foreignKey: 'destination_id',
      as: 'destination',
    });
  }
}

export default Flight;
