module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          // 123
          password_hash:
            '$2b$08$P10EzRLEdnM.TUEmtzEdtukxxon7dYP082BNv8WIu.Z3dVYn9vYvK',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
