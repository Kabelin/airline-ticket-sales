import Sequelize, { Model } from 'sequelize';

class Airport extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        city: Sequelize.STRING,
        federal_unity: Sequelize.STRING,
        connections: Sequelize.JSONB,
      },
      { sequelize }
    );

    return this;
  }
}

export default Airport;
