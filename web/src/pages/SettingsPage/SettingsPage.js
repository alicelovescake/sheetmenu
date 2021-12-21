import AccountSettings from '../../components/AccountSettings'
import SubscriptionSettings from '../../components/SubscriptionSettings'
import RestaurantSettings from '../../components/RestaurantSettings'
import ThemeSettings from '../../components/ThemeSettings'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'

const UPDATE_RESTAURANT = gql`
  mutation UpdateRestaurantMutation(
    $id: String!
    $input: UpdateRestaurantInput!
  ) {
    updateRestaurant(id: $id, input: $input) {
      id
    }
  }
`

const GET_RESTAURANT = gql`
  query GetRestaurant($ownerId: String!) {
    restaurantByOwnerId(ownerId: $ownerId) {
      id
      name
      brandColor
      sheetId
      theme
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      name
    }
  }
`
const GET_USER = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      id
      name
      subscribed
    }
  }
`

const SettingsPage = () => {
  const { currentUser } = useAuth()
  const { data: resturantData } = useQuery(GET_RESTAURANT, {
    variables: { ownerId: currentUser.id },
  })

  const [updateRestaurant, { loading: loadingRestaurant }] = useMutation(
    UPDATE_RESTAURANT,
    {
      onCompleted: () => {
        toast.success('Your restaurant info is updated!')
      },
      refetchQueries: [
        { query: GET_RESTAURANT, variables: { ownerId: currentUser.id } },
      ],
    }
  )

  const [updateUser, { loading: loadingUser }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success('Your account info is updated!')
    },
    refetchQueries: [
      { query: GET_USER, variables: { email: currentUser.email } },
    ],
  })

  const { data: userData } = useQuery(GET_USER, {
    variables: { email: currentUser.email },
  })

  return (
    <main className="mt-10 p-4 pt-0 max-w-6xl mx-auto">
      <div className="font-bold p-4 text-xl bg-green-100 rounded-lg">
        Access your Google Sheet with this link:{' '}
        <a
          className="hover:text-green-800 text-xl underline break-all"
          href={`https://docs.google.com/spreadsheets/d/${resturantData?.restaurantByOwnerId.sheetId}`}
        >
          {`https://docs.google.com/spreadsheets/d/${resturantData?.restaurantByOwnerId.sheetId}`}
        </a>
      </div>
      <div className="pt-20">
        <AccountSettings
          data={userData}
          update={updateUser}
          loading={loadingUser}
        />
      </div>
      <div className="pt-20">
        <RestaurantSettings
          data={resturantData}
          update={updateRestaurant}
          loading={loadingRestaurant}
        />
      </div>
      <div className="py-20">
        <ThemeSettings
          data={resturantData}
          update={updateRestaurant}
          loading={loadingRestaurant}
        />
      </div>
      <div className="py-20">
        <SubscriptionSettings
          data={userData}
          update={updateUser}
          loading={loadingUser}
        />
      </div>
    </main>
  )
}

export default SettingsPage
