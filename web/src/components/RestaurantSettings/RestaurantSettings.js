import useOnClickOutside from '../../hooks/useOnClickOutside'

import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import { useState, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { toast, Toaster } from '@redwoodjs/web/toast'
import AddressAutocomplete from '../AddressAutocomplete'

import { SketchPicker } from 'react-color'

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

const RestaurantSettings = () => {
  const { currentUser } = useAuth()
  const { data } = useQuery(GET_RESTAURANT, {
    variables: { ownerId: currentUser.id },
    onCompleted: () => {
      setRestaurant(data.restaurantByOwnerId)
      setColorHex(data.restaurantByOwnerId.brandColor)
    },
  })

  const [diplayColorPicker, setDisplayColorPicker] = useState(false)

  const [colorHex, setColorHex] = useState('#FFFFFF')

  const [restaurant, setRestaurant] = useState(null)

  const formMethods = useForm()

  const [update, { loading }] = useMutation(UPDATE_RESTAURANT, {
    onCompleted: () => {
      toast.success('Your restaurant info is updated!')
    },
    refetchQueries: [
      { query: GET_RESTAURANT, variables: { ownerId: currentUser.id } },
    ],
  })

  const onSubmit = ({
    restaurantName,
    addressNumber,
    addressStreet,
    postalCode,
    city,
    state,
    country,
  }) => {
    update({
      variables: {
        id: restaurant.id,
        input: {
          name: restaurantName,
          brandColor: colorHex,
          address: {
            addressNumber,
            addressStreet,
            postalCode,
            city,
            state,
            country,
          },
        },
      },
    })
  }

  const handleColorClick = () => {
    setDisplayColorPicker(!diplayColorPicker)
  }

  const handleColorClose = () => {
    setDisplayColorPicker(false)
  }

  const handleColorChange = (color) => {
    setColorHex(color.hex)
  }

  const colorPickerRef = useRef()
  useOnClickOutside(colorPickerRef, () => setDisplayColorPicker(false))
  console.log(data?.restaurantByOwnerId)
  return (
    <div>
      <h2 className="font-bold pb-10 pl-6">Restaurant Settings</h2>
      <Toaster />
      <Form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg space-y-4"
        formMethods={formMethods}
      >
        <div>
          <Label name="restaurantName" className="font-bold pr-2 text-sm">
            Restaurant Name
          </Label>
          <TextField
            name="restaurantName"
            defaultValue={restaurant?.name}
            className="bg-gray-100 p-2 rounded-lg block w-full"
            validation={{ required: true }}
          />
          <FieldError name="restaurantName" className="error-message" />
        </div>
        <div>
          <Label name="colorPicker" className="font-bold pr-2 text-sm">
            Your Brand Color:
          </Label>
          <div>
            <div
              className=" bg-gray-100 inline-block cursor-pointer rounded-lg"
              role="button"
              tabIndex={0}
              onClick={handleColorClick}
              onKeyDown={handleColorClick}
            >
              <div
                className="w-12 h-8 border-r-1 rounded-md"
                style={{
                  backgroundColor: colorHex,
                }}
              />
            </div>
            {diplayColorPicker ? (
              <div className="absolute z-10" ref={colorPickerRef}>
                {' '}
                <div
                  onClick={handleColorClose}
                  onKeyDown={handleColorClose}
                  role="button"
                  tabIndex={0}
                />{' '}
                <SketchPicker color={colorHex} onChange={handleColorChange} />{' '}
              </div>
            ) : null}
          </div>
          <FieldError name="colorPicker" className="error-message" />
        </div>

        <AddressAutocomplete
          addressStreet={restaurant?.address.addressStreet}
          addressUnitNumber={restaurant?.address.addressNumber}
          postcode={restaurant?.address.postalCode}
          state={restaurant?.address.state}
          city={restaurant?.address.city}
          country={restaurant?.address.country}
        />

        <Submit
          className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75"
          disabled={loading}
        >
          Save
        </Submit>
      </Form>

      <div className="font-bold pb-10 pt-10 pl-6">
        <h2>
          Access your Google Sheet with{' '}
          <a
            className="hover:text-green-800 italic"
            href={`https://docs.google.com/spreadsheets/d/${data?.restaurantByOwnerId.sheetId}`}
          >
            this link
          </a>
        </h2>
      </div>
    </div>
  )
}

export default RestaurantSettings
