import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.FLOAT,
        seats: Sequelize.JSON,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Flight, { foreignKey: 'flight_id' });
  }
}

export default Purchase;
