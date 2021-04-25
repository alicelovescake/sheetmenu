import { Link, routes } from '@redwoodjs/router'
import AccountSetting from '../../components/AccountSetting'
import RestaurantSetting from '../../components/RestaurantSetting'
import { useState } from 'react'

const menuOptions = { account: AccountSetting, restaurant: RestaurantSetting }

const SettingPage = () => {
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

export default SettingPage
