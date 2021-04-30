export const standard = defineScenario({
  address: {
    one: {
      addressNumber: 8770281,
      addressStreet: 'String',
      city: 'String',
      country: 'String',
      postalCode: 'String',
      state: 'String',
      restaurant: {
        create: {
          name: 'String',
          sheetId: 'String',
          brandColor: 'String',
          owner: { create: { email: 'String2729908', firebaseId: 'String' } },
        },
      },
    },

    two: {
      addressNumber: 8270320,
      addressStreet: 'String',
      city: 'String',
      country: 'String',
      postalCode: 'String',
      state: 'String',
      restaurant: {
        create: {
          name: 'String',
          sheetId: 'String',
          brandColor: 'String',
          owner: { create: { email: 'String3005755', firebaseId: 'String' } },
        },
      },
    },
  },
})
