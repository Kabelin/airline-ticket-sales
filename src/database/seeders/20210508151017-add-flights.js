module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'flights',
      [
        {
          date: new Date(2021, 7, 21, 12),
          origin_id: 1,
          destination_id: 2,
          quantity_available: 2,
          value: 199.99,
          remaining_seats: JSON.stringify([
            {
              name: '38A',
            },
            {
              name: '71D',
            },
          ]),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: new Date(2021, 7, 21, 6),
          origin_id: 2,
          destination_id: 3,
          quantity_available: 3,
          value: 159.99,
          remaining_seats: JSON.stringify([
            {
              name: '41B',
            },
            {
              name: '52C',
            },
            {
              name: '53D',
            },
          ]),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('flights', null, {});
  },
};
