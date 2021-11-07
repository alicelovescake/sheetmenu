import useOnClickOutside from '../../hooks/useOnClickOutside'

import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react'
import { Toaster } from '@redwoodjs/web/toast'

import { SketchPicker } from 'react-color'

const RestaurantSettings = ({ data, update, loading }) => {
  const [diplayColorPicker, setDisplayColorPicker] = useState(false)

  const [colorHex, setColorHex] = useState('#FFFFFF')

  const [restaurant, setRestaurant] = useState(null)

  useEffect(() => {
    if (data) {
      setRestaurant(data.restaurantByOwnerId)
      setColorHex(data.restaurantByOwnerId.brandColor)
    }
  }, [data])

  const formMethods = useForm()

  const onSubmit = ({ restaurantName }) => {
    update({
      variables: {
        id: restaurant.id,
        input: {
          name: restaurantName,
          brandColor: colorHex,
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

  return (
    <div>
      <h2 className="font-bold pb-10 pl-2 text-2xl">Restaurant Settings</h2>
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

        <Submit
          className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75"
          disabled={loading}
        >
          Save
        </Submit>
      </Form>
    </div>
  )
}

export default RestaurantSettings
