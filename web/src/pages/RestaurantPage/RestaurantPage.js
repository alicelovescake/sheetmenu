import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

const GET_RESTAURANT = gql`
  query GetRestaurant($ownerId: String!) {
    restaurantByOwnerId(ownerId: $ownerId) {
      id
      name
      brandColor
      sheetId
      address {
        addressNumber
        addressStreet
        postalCode
        city
        state
        country
      }
    }
  }
`
const RestaurantPage = ({ id }) => {
  const { data } = useQuery(GET_RESTAURANT, {
    variables: { id },
  })

  return (
    <>
      <h1>{id}</h1>
      <p>
        Find me in <code>./web/src/pages/RestaurantPage/RestaurantPage.js</code>
      </p>
      <p>
        My default route is named <code>restaurant</code>, link to me with `
        <Link to={routes.restaurant({ id: data?.restaurantByOwnerId.id })}>
          Restaurant
        </Link>
        `
      </p>
    </>
  )
}

export default RestaurantPage
