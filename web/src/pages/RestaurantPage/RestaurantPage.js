import { useQuery } from '@redwoodjs/web'
import Template1 from 'src/components/Template1/Template1'
import Template2 from 'src/components/Template2/Template2'

const GET_RESTURANT_INFO = gql`
  query GetInfo($id: String!) {
    restaurantById(id: $id) {
      id
      brandColor
      sheetId
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

const templateOptions = { 1: Template1, 2: Template2 }

const RestaurantPage = ({ id }) => {
  const { loading, error, data } = useQuery(GET_RESTURANT_INFO, {
    variables: { id },
  })

  if (loading) return 'Loading...'

  if (error) return `Error! ${error.message}`

  const Template = templateOptions[2]

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
