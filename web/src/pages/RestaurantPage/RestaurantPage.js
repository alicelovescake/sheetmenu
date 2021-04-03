import { Link, routes } from '@redwoodjs/router'

const RestaurantPage = ({ id }) => {
  return (
    <>
      <div>
        <p>
          <Link to={routes.restaurant()}>Restaurant</Link>
        </p>
        <h1 className="text-red-800">Restaurant Page</h1>
        <div className="grid grid-cols-3 gap-12 m-16">
          <div className="row-span-6 bg-gray-300">
            <div className="m-8 text-xl font-extrabold">
              <h1>hearth menu</h1>
            </div>
            <div>
              <h2>Hot Dog</h2>
            </div>
          </div>
          <div className="row-span-6 col-span-2 bg-black">2</div>
        </div>
      </div>
    </>
  )
}

export default RestaurantPage
