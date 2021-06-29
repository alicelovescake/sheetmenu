import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import Template1 from 'src/components/Template1/Template1'

const GET_RESTAURANT = gql`
  query GetRestaurant($id: String!) {
    restaurantById(id: $id) {
      id
      name
      brandColor
      sheetId
      address {
        id
        addressNumber
        addressStreet
        postalCode
        city
        state
        country
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
  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id },
  })

  if (loading) return 'Loading...'

  if (error) return `Error! ${error.message}`

  const Template = templateOptions[1]

  console.log(data?.restaurantById)

  return (
    <>
      <Template
        address={data?.restaurantById.address}
        brandColor={data?.restaurantById.brandColor}
        menus={data?.restaurantById.menus}
        name={data?.restaurantById.name}
      />
    </>
  )
}

export default RestaurantPage
