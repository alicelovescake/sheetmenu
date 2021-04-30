import React, { useState, useEffect, useRef } from 'react'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'

const AddressAutocomplete = () => {
  const address1FieldRef = useRef(null)
  const [address1, setAddress1] = useState('')
  const [postcode, setPostcode] = useState('')
  const [statelocation, setStatelocation] = useState('')
  const [locality, setLocality] = useState('')
  const [country, setCountry] = useState('')
  const [address2, setAddress2] = useState('')

  useEffect(() => {
    const handleScriptLoad = (address1FieldRef) => {
      const autoComplete = new window.google.maps.places.Autocomplete(
        address1FieldRef.current,
        { fields: ['address_components', 'geometry'], types: ['address'] }
      )

      autoComplete.setFields(['address_components', 'formatted_address'])
      autoComplete.addListener('place_changed', () =>
        handlePlaceSelect(autoComplete)
      )
    }
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places`,
      () => handleScriptLoad(address1FieldRef)
    )
  }, [])

  const loadScript = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'

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

  const handlePlaceSelect = async (autoComplete) => {
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
          streetAddress = streetAddress + ' ' + component.short_name
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
          setLocality(component.long_name)
          break
        }

        case 'administrative_area_level_1': {
          setStatelocation(component.short_name)
          break
        }

        case 'country': {
          setCountry(component.long_name)
          break
        }
      }
    }
    setAddress1(streetAddress)
    setPostcode(postcode)
  }

  return (
    <div className="font-bold pr-2 text-sm">
      <div>Address</div>
      <TextField
        name="addressStreet"
        ref={address1FieldRef}
        onChange={(event) => setAddress1(event.target.value)}
        required={true}
        value={address1}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />
      <div className="pt-5">Unit, suite, or floor #</div>
      <TextField
        name="addressNumber"
        onChange={(event) => setAddress2(event.target.value)}
        value={address2}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />

      <div className="pt-5">City*</div>
      <TextField
        name="city"
        defaultValue={locality}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />

      <div className="flex-row gap-10">
        <div className="pt-5">State/Province*</div>
        <TextField
          name="state"
          defaultValue={statelocation}
          className="bg-gray-100 p-2 rounded-lg block w-2/5"
        />
        <div className="pt-5">Postal code*</div>
        <TextField
          name="postalCode"
          defaultValue={postcode}
          className="bg-gray-100 p-2 rounded-lg block w-2/5"
        />
      </div>

      <div className="pt-5">Country/Region*</div>
      <TextField
        name="country"
        defaultValue={country}
        className="bg-gray-100 p-2 rounded-lg block w-full"
      />
    </div>
  )
}

export default AddressAutocomplete
