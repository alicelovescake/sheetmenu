import { navigate, routes, Redirect } from '@redwoodjs/router'
import useOnClickOutside from '../../hooks/useOnClickOutside'

import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import { useAuth } from '@redwoodjs/auth'
import { useState, useRef } from 'react'
import AddressAutocomplete from '../../components/AddressAutocomplete'
import { VscLoading } from 'react-icons/Vsc'

import { SketchPicker } from 'react-color'

const ONBOARD_USER = gql`
  mutation OnboardMutation($input: OnboardInput!) {
    onboard(input: $input)
  }
`

const OnboardPage = () => {
  const { reauthenticate, currentUser } = useAuth()

  const [create, { loading }] = useMutation(ONBOARD_USER, {
    onCompleted: async () => {
      await reauthenticate()
      navigate(routes.settings())
    },
  })

  const formMethods = useForm()

  const onSubmit = ({
    addressNumber,
    addressStreet,
    city,
    country,
    postalCode,
    state,
    restaurantName,
    userName,
  }) => {
    create({
      variables: {
        input: {
          userName,
          restaurantName,
          brandColor: colorHex,
          address: {
            addressNumber,
            addressStreet,
            city,
            country,
            postalCode,
            state,
          },
        },
      },
    })
  }

  const [diplayColorPicker, setDisplayColorPicker] = useState(false)

  const [colorHex, setColorHex] = useState('#C81D25')

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

  if (loading) {
    return (
      <VscLoading className="animate-spin text-8xl text-green-700 mx-auto h-screen" />
    )
  }

  if (currentUser.restaurantId) {
    return <Redirect to={routes.home()} />
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="mb-4 space-y-4 p-6">
        <h1 className="font-bold text-2xl">Welcome!</h1>

        <p>
          Thanks for joining sheetmenu! We&apos;ll help you get a website up and
          running in under five minutes.
        </p>

        <p>
          First, we just need a little bit of info about you and your
          restaurant.
        </p>
      </div>

      <Form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg space-y-4"
        formMethods={formMethods}
      >
        <div>
          <Label name="userName" className="font-bold pr-2 text-sm">
            Name
          </Label>
          <TextField
            name="userName"
            className="bg-gray-100 p-2 rounded-lg block w-full"
            validation={{ required: true }}
          />
          <FieldError name="userName" className="error-message" />
        </div>

        <div>
          <Label name="restaurantName" className="font-bold pr-2 text-sm">
            Restaurant Name
          </Label>
          <TextField
            name="restaurantName"
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

        <AddressAutocomplete />

        <Submit
          className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75"
          disabled={loading}
        >
          Save
        </Submit>
      </Form>
    </main>
  )
}

export default OnboardPage
