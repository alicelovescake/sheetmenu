import headerPic from './header-food.jpeg'
import MenuCard from '../MenuCard'
import OrderCard from '../OrderCard'
import { useRef } from 'react'

const Template1 = ({ address, brandColor, menus, name }) => {
  const orderRef = useRef(null)

  return (
    <>
      <header className="font-serif p-10">
        <h1 className="text-center text-5xl">{name}</h1>
      </header>

      <section className="flex flex-row gap-80">
        <div className="font-sans-serif text-7xl tracking-wide p-10">
          Eat Something{' '}
          <p className="font-bold font-serif italic underline text-green-700 pt-3">
            Fresh
          </p>
          <p className="text-base pt-10">
            Authentic Japanese flavors you won&apos;t find anywhere else.
            Recipies handed down for generations. And a serious obession with
            making delicous food.
          </p>
          <div
            className="text-xl mt-20 text-white bg-green-700 rounded-full w-1/3 p-4 text-center"
            onClick={() => orderRef.current?.scrollIntoView()}
            onKeyDown={() =>
              orderRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            role="button"
            tabIndex={0}
          >
            Order Now
          </div>
        </div>
        <img
          src={headerPic}
          alt="Plate of food"
          className="w-1/2 h-1/4 rounded-xl opacity-80"
        />
      </section>

      <section className="bg-white p-32 mx-80 my-20 shadow-xl rounded-xl flex justify-center items-center">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl">Fresh Ingredients</h1>
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-2xl">Authentic Experience</h1>
        </div>
        <div className="flex-1">
          <h1 className="ml-10 font-semibold text-2xl">Made to Order</h1>
        </div>
      </section>

      <section>
        {menus.map((menu) => (
          <MenuCard key={menu.id} name={menu.name} items={menu.items} />
        ))}
      </section>

      <section ref={orderRef}>
        <OrderCard key={address.id} address={address} />
      </section>
    </>
  )
}

export default Template1
