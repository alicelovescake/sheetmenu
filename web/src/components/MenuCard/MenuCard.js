import ItemCard from '../ItemCard'

const MenuCard = ({ name, items }) => {
  return (
    <>
      <div className="text-center text-4xl font-serif m-20">{name}</div>
      <div className="inline-grid grid-cols-4 gap-x-40 justify-around mx-80">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </>
  )
}

export default MenuCard
