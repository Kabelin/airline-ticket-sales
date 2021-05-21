module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'airports',
      [
        {
          name: 'GRU Airport',
          zip_code: '07190-100',
          city: 'Guarulhos',
          federal_unity: 'SP',
          connections: JSON.stringify({
            airports: [
              {
                name: 'RIOgaleão - Aeroporto Internacional Tom Jobim',
                zip_code: '21941-900',
              },
              {
                name: 'Água Boa Airport',
                zip_code: '78635-000',
              },
            ],
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Água Boa Airport',
          zip_code: '78635-000',
          city: 'Água Boa',
          federal_unity: 'MT',
          connections: JSON.stringify({
            airports: [
              {
                name: 'GRU Airport',
                zip_code: '07190-100',
              },
              {
                name: 'Januaria Airport',
                zip_code: '39480-000',
              },
            ],
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Januaria Airport',
          zip_code: '39480-000',
          city: 'Januária',
          federal_unity: 'MG',
          connections: JSON.stringify({
            airports: [
              {
                name: 'Água Boa Airport',
                zip_code: '78635-000',
              },
              {
                name: 'Aeroporto Internacional de Brasília',
                zip_code: '71608-900',
              },
            ],
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Aeroporto Internacional de Brasília',
          zip_code: '71608-900',
          city: 'Brasília',
          federal_unity: 'DF',
          connections: JSON.stringify({
            airports: [
              {
                name: 'Januaria Airport',
                zip_code: '39480-000',
              },
              {
                name: 'RIOgaleão - Aeroporto Internacional Tom Jobim',
                zip_code: '21941-900',
              },
            ],
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'RIOgaleão - Aeroporto Internacional Tom Jobim',
          zip_code: '21941-900',
          city: 'Rio de Janeiro',
          federal_unity: 'RJ',
          connections: JSON.stringify({
            airports: [
              {
                name: 'Aeroporto Internacional de Brasília',
                zip_code: '71608-900',
              },
              {
                name: 'GRU Airport',
                zip_code: '07190-100',
              },
            ],
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('airports', null, {});
  },
};
