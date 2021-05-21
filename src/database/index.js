import Sequelize from 'sequelize';
import Umzug from 'umzug';

import Airport from '../app/models/Airport';
import Flight from '../app/models/Flight';
import Purchase from '../app/models/Purchase';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Airport, Flight, Purchase, User];

class Database {
  constructor() {
    this.init();
  }

  async checkConnection(connection) {
    await connection
      .authenticate()
      .then(() => {
        console.info('Connection has been established successfully.');
        this.cb = true;
      })
      .catch((error) => {
        console.error(
          `Unable to connect to the database, retrying in 1 second!\n`,
          error
        );
        this.cb = false;
      });
  }

  async tryConnection(retries, delay) {
    const intervalId = await setInterval(() => {
      this.checkConnection(this.connection).then(() => {
        if (this.cb) {
          clearInterval(intervalId);
          this.runMigrations();
          // this.undoMigrations();
        } else if (retries - 1 === 0) clearInterval(intervalId);
        else retries -= 1;
      });
    }, delay);
  }

  async runMigrations() {
    const migrationsConfig = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: this.connection,
      },
      migrations: {
        params: [
          this.connection.getQueryInterface(),
          this.connection.constructor,
        ],
        path: 'src/database/migrations',
        pattern: /\.js$/,
      },
      logger: false,
    });

    await migrationsConfig.up();

    this.runSeeders();
  }

  async runSeeders() {
    const seedersConfig = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: this.connection,
        modelName: 'sequelize_data',
      },
      migrations: {
        params: [this.connection.getQueryInterface()],
        path: 'src/database/seeders',
        pattern: /\.js$/,
      },
      logger: false,
    });

    await seedersConfig.up();

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  // async undoAll() {
  //   const migrationsConfig = new Umzug({
  //     storage: 'sequelize',
  //     storageOptions: {
  //       sequelize: this.connection,
  //     },
  //     migrations: {
  //       params: [
  //         this.connection.getQueryInterface(),
  //         this.connection.constructor,
  //       ],
  //       path: 'src/database/migrations',
  //       pattern: /\.js$/,
  //     },
  //     logger: false,
  //   });

  //   const seedersConfig = new Umzug({
  //     storage: 'sequelize',
  //     storageOptions: {
  //       sequelize: this.connection,
  //       modelName: 'sequelize_data',
  //     },
  //     migrations: {
  //       params: [this.connection.getQueryInterface()],
  //       path: 'src/database/seeders',
  //       pattern: /\.js$/,
  //     },
  //     logger: false,
  //   });

  //   await migrationsConfig.down();

  //   await seedersConfig.down();
  // }

  init() {
    const retries = 10;

    const delay = 1000;

    this.cb = false;

    this.connection = new Sequelize(databaseConfig);

    this.tryConnection(retries, delay);
  }
}

export default new Database();
