import { useQuery } from '@redwoodjs/web'
import Template1 from 'src/components/Template1/Template1'

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

const templateOptions = { 1: Template1 }

const RestaurantPage = ({ id }) => {
  const { loading, error, data } = useQuery(GET_RESTURANT_INFO, {
    variables: { id },
  })

  if (loading) return 'Loading...'

  if (error) return `Error! ${error.message}`

  const Template = templateOptions[1]

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
