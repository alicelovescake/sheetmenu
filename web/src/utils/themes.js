import SpicyModernTemplate from 'src/components/SpicyModern/SpicyModernTemplate'
import UmamiMichelinTemplate from 'src/components/UmamiMichelin/UmamiMichelinTemplate'

export const themes = [
  {
    id: 1,
    name: 'Umami Michelin',
    preview: '/themes/umami-michelin.png',
    template: UmamiMichelinTemplate,
  },
  {
    id: 2,
    name: 'Spicy Modern',
    preview: '/themes/spicy-modern.jpg',
    template: SpicyModernTemplate,
  },
]

export const getThemeTemplate = (themeId) => {
  const selectedTheme = themes.find(({ id }) => id === parseInt(themeId))
  return selectedTheme ? selectedTheme.template : SpicyModernTemplate
}
