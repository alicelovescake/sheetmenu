import React, { useState, useEffect, useRef } from 'react'
import { TextField, Label } from '@redwoodjs/forms'

const AddressAutocomplete = (props) => {
  const autocompleteFieldRef = useRef(null)
  const [addressStreet, setAddressStreet] = useState(props.addressStreet || '')
  const [postcode, setPostcode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [addressUnitNumber] = useState('')

  useEffect(() => {
    const handleScriptLoad = (autocompleteFieldRef) => {
      const autoComplete = new window.google.maps.places.Autocomplete(
        autocompleteFieldRef.current,
        { fields: ['address_components', 'geometry'], types: ['address'] }
      )

      autoComplete.setFields(['address_components', 'formatted_address'])
      autoComplete.addListener('place_changed', () =>
        handlePlaceSelect(autoComplete)
      )
    }
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places`,
      () => handleScriptLoad(autocompleteFieldRef)
    )
  }, [])

  const loadScript = (url, callback) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'data'

    if (document.getElementById('data')) {
      return
    }

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  const handlePlaceSelect = (autoComplete) => {
    const addressObject = autoComplete.getPlace()
    let streetAddress = ''
    let postcode = ''
    for (const component of addressObject.address_components) {
      const componentType = component.types[0]

      switch (componentType) {
        case 'street_number': {
          streetAddress += component.long_name
          break
        }

        case 'route': {
          streetAddress = `${streetAddress} ${component.short_name}`
          break
        }

        case 'postal_code': {
          postcode += component.long_name
          break
        }

        case 'postal_code_suffix': {
          postcode += component.long_name
          break
        }

        case 'locality': {
          setCity(component.long_name)
          break
        }

        case 'administrative_area_level_1': {
          setState(component.short_name)
          break
        }

        case 'country': {
          setCountry(component.long_name)
          break
        }
      }
    }
    setAddressStreet(streetAddress)
    setPostcode(postcode)
  }

  return (
    <div className="font-bold pr-2 text-sm">
      <Label name="addressStreet">Address</Label>
      <TextField
        name="addressStreet"
        ref={autocompleteFieldRef}
        required={true}
        defaultValue={addressStreet || props.addressStreet}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />
      <Label name="addressNumber" className="pt-5">
        Unit, suite, or floor #
      </Label>
      <TextField
        name="addressNumber"
        defaultValue={addressUnitNumber || props.addressUnitNumber}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />

      <Label name="city" className="pt-5">
        City*
      </Label>
      <TextField
        name="city"
        defaultValue={city || props.city}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />

      <div className="flex-row gap-10">
        <Label name="state" className="pt-5">
          State/Province*
        </Label>
        <TextField
          name="state"
          defaultValue={state || props.state}
          className="bg-gray-100 p-2 rounded-lg block w-2/5"
        />
        <Label name="postalCode" className="pt-5">
          Postal code*
        </Label>
        <TextField
          name="postalCode"
          defaultValue={postcode || props.postcode}
          className="bg-gray-100 p-2 rounded-lg block w-2/5"
        />
      </div>

      <Label name="country" className="pt-5">
        Country/Region*
      </Label>
      <TextField
        name="country"
        defaultValue={country || props.country}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />
    </div>
  )
}

export default AddressAutocomplete
