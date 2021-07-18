import { useQuery } from '@redwoodjs/web'
import { VscLoading } from 'react-icons/Vsc'

import { getThemeTemplate } from 'src/utils/themes'

const GET_RESTURANT_INFO = gql`
  query GetInfo($id: String!) {
    restaurantById(id: $id) {
      id
      brandColor
      sheetId
      theme
      busInfo {
        id
        name
        address {
          addressNumber
          addressStreet
          postalCode
          city
          state
          country
        }
        hours {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
        phone
        description
        valueProp1
        valueProp2
        valueProp3
      }
      menus {
        id
        name
        items {
          id
          name
          price
          description
        }
      }
    }
  }
`

const RestaurantPage = ({ id, themeId }) => {
  const { loading, error, data } = useQuery(GET_RESTURANT_INFO, {
    variables: { id },
  })

  if (loading) {
    return (
      <VscLoading className="animate-spin text-8xl text-green-700 mx-auto h-screen" />
    )
  }

  if (error) return `Error! ${error.message}`

  const Template = getThemeTemplate(themeId || data?.restaurantById.theme)

  return (
    <>
      <Template
        address={data?.restaurantById.busInfo.address}
        brandColor={data?.restaurantById.brandColor}
        menus={data?.restaurantById.menus}
        busInfo={data?.restaurantById.busInfo}
      />
    </>
  )
}

export default RestaurantPage
