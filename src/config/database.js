module.exports = {
  dialect: 'postgres',

  // docker-compose credentials
  host: 'db',

  // postgres on localhost
  // host: 'localhost',

  username: 'airline-ticket-sales',
  password: 'banco123',
  database: 'airline-ticket-sales',

  // used to configure sequelize-cli in the same way of umzug
  migrationStorageTableName: 'sequelize_meta',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
