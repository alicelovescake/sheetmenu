import AccountSettings from '../../components/AccountSettings'
import RestaurantSettings from '../../components/RestaurantSettings'
import ThemeSettings from '../../components/ThemeSettings'
import { useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'

const menuOptions = {
  account: AccountSettings,
  restaurant: RestaurantSettings,
  theme: ThemeSettings,
}

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

const SettingsPage = () => {
  const { currentUser } = useAuth()
  const { data } = useQuery(GET_RESTAURANT, {
    variables: { ownerId: currentUser.id },
  })

  const [update, { loading }] = useMutation(UPDATE_RESTAURANT, {
    onCompleted: () => {
      toast.success('Your restaurant info is updated!')
    },
    refetchQueries: [
      { query: GET_RESTAURANT, variables: { ownerId: currentUser.id } },
    ],
  })

  const [currentForm, setCurrentForm] = useState('account')

  const Form = menuOptions[currentForm]

  return (
    <main className="inline-flex">
      <div className="grid-flow-col grid-cols-1 grid-rows-3 gap-4 border-2 inline-grid font-semibold">
        <div className="flex flex-col">
          <button
            onClick={() => setCurrentForm('account')}
            className="border-2 p-10"
          >
            Account
          </button>

          <button
            onClick={() => setCurrentForm('restaurant')}
            className="border-2 p-10"
          >
            Restaurant
          </button>

          <button
            onClick={() => setCurrentForm('theme')}
            className="border-2 p-10"
          >
            Theme
          </button>
        </div>
      </div>
      <div className=" pl-20">
        <Form data={data} update={update} loading={loading} />
      </div>
    </main>
  )
}

export default SettingsPage
