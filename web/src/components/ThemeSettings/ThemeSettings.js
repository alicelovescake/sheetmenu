import { Toaster } from '@redwoodjs/web/toast'
const ThemeSettings = ({ data, update, loading }) => {
  const handleClick = (e) => {
    let themeSelection
    if (e.target.value === 'theme2') {
      themeSelection = '2'
    } else {
      themeSelection = '1'
    }
    update({
      variables: {
        id: data.restaurantByOwnerId.id,
        input: {
          theme: themeSelection,
        },
      },
    })
  }

  return (
    <div className="flex">
      <Toaster />
      <div className="m-10 mr-20">
        <div
          className="px-64 py-40 border-green-700 border-4 shadow-2xl"
          style={{
            backgroundImage: 'url(/template2.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>

        <button
          onClick={handleClick}
          value="theme1"
          className="text-2xl font-bold mt-10 ml-44 px-8 py-4 rounded-2xl bg-green-700 text-white hover:bg-green-800 hover:outline-none"
        >
          Theme 1
        </button>
      </div>

      <div className="m-10">
        <div
          className="px-64 py-40 border-green-700 border-4 shadow-2xl"
          style={{
            backgroundImage: 'url(/template1.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>

        <button
          onClick={handleClick}
          value="theme2"
          className="text-2xl font-bold mt-10 ml-44 px-8 py-4 rounded-2xl bg-green-700 text-white hover:bg-green-800 hover:outline-none"
        >
          Theme 2
        </button>
      </div>
    </div>
  )
}

export default ThemeSettings
