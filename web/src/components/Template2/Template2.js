import MenuCard2 from '../MenuCard2/MenuCard2'
import ContactCard2 from '../ContactCard2/ContactCard2'

const Template2 = ({ address, brandColor, menus, busInfo }) => {
  return (
    <div className="flex">
      <section
        className="w-1/6 h-screen bg-gray-100 static"
        style={{
          backgroundImage: 'url(/rice.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="text-center text-5xl font-extrabold mt-10">
          {busInfo.name}
        </div>
        <ContactCard2 address={address} busInfo={busInfo} />
      </section>

      <section
        className="w-2/6 h-screen pt-24 overflow-scroll"
        style={{ backgroundColor: brandColor }}
      >
        {menus.map((menu) => (
          <MenuCard2 key={menu.id} name={menu.name} items={menu.items} />
        ))}
      </section>

      <section
        className="w-3/6 h-screen"
        style={{
          backgroundImage: 'url(/sushi.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="bg-gray-100 opacity-50 my-36 mx-20 p-10">
          <div className="font-extrabold opacity-100 text-6xl tracking-wide">
            {busInfo.description}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Template2
