import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

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
const RestaurantPage = ({ id }) => {
  const { data } = useQuery(GET_RESTAURANT, {
    variables: { id },
  })
  console.log(data)

  return (
    <>
      <h1>{id}</h1>
      <p>
        Find me in <code>./web/src/pages/RestaurantPage/RestaurantPage.js</code>
      </p>
      <p>
        My default route is named <code>restaurant</code>, link to me with `
        <Link to={routes.restaurant({ id: data?.restaurantById.id })}>
          Restaurant
        </Link>
        `
      </p>
    </>
  )
}

export default RestaurantPage
