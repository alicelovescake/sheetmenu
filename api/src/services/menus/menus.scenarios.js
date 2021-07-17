export const standard = defineScenario({
  menu: {
    one: {
      restaurant: {
        create: {
          name: 'String',
          sheetId: 'String',
          brandColor: 'String',
          owner: { create: { email: 'String5596946', firebaseId: 'String' } },
        },
      },
    },

    two: {
      restaurant: {
        create: {
          name: 'String',
          sheetId: 'String',
          brandColor: 'String',
          owner: { create: { email: 'String1377098', firebaseId: 'String' } },
        },
      },
    },
  },
})
