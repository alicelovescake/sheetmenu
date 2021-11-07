import { Toaster } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { themes } from 'src/utils/themes'

const ThemeSettings = ({ data, update }) => {
  const selectTheme = (theme) => {
    update({
      variables: {
        id: data.restaurantByOwnerId.id,
        input: {
          theme,
        },
      },
    })
  }

  return (
    <>
      <h2 className="font-bold pb-10 pl-2 text-2xl">Theme Settings</h2>
      <div className="grid grid-cols-2 gap-20 w-full">
        <Toaster />

        {themes.map(({ id, name, preview }) => (
          <div key={id} className="space-y-4 text-center">
            <div
              className="px-64 py-40 border-green-700 border-4 shadow-xl"
              style={{
                backgroundImage: `url(${preview})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            ></div>

            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl">{name}</div>

              <div className="space-x-4">
                <Link
                  to={routes.restaurant({
                    id: data?.restaurantByOwnerId.id,
                    themeId: id,
                  })}
                  className="hover:text-green-800"
                >
                  Preview
                </Link>

                <button
                  onClick={() => selectTheme(`${id}`)}
                  className="px-4 py-2 rounded-2xl bg-green-700 text-white hover:bg-green-800 hover:outline-none"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ThemeSettings
