const MenuCard = ({ name, items }) => {
  return (
    <>
      <div className="font-thin text-6xl text-center text-gray-100 italic ">
        {name}
      </div>

      <div>
        {items.map(({ name, description, price, id }) => (
          <div
            className="text-gray-50 text-xl p-10 grid justify-items-center  "
            key={id}
          >
            <span className="text-2xl mb-4 underline">{name}</span>
            <span>{description}</span>
            <span className="text-red-100 mt-4">${price}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default MenuCard
