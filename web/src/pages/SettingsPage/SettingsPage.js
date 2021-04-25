import AccountSettings from '../../components/AccountSettings'
import RestaurantSettings from '../../components/RestaurantSettings'
import { useState } from 'react'

const menuOptions = { account: AccountSettings, restaurant: RestaurantSettings }

const SettingsPage = () => {
  const [currentForm, setCurrentForm] = useState('account')

  const Form = menuOptions[currentForm]

  return (
    <main>
      <div className="grid-flow-col grid-cols-1 grid-rows-3 gap-4 border-2 inline-grid">
        <div>
          <div
            onClick={() => setCurrentForm('account')}
            onKeyDown={() => setCurrentForm('account')}
            role="button"
            tabIndex={0}
            className="border-2 p-10"
          >
            Account
          </div>
          <div
            onClick={() => setCurrentForm('restaurant')}
            onKeyDown={() => setCurrentForm('restaurant')}
            role="button"
            tabIndex={0}
            className="border-2 p-10"
          >
            Restaurant
          </div>
        </div>
      </div>
      <div className="inline-grid pl-20">
        <Form />
      </div>
    </main>
  )
}

export default SettingsPage
