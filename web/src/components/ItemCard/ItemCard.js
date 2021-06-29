const ItemCard = ({ name, price, description }) => {
  return (
    <div>
      <div
        style={{
          backgroundImage: 'url(/burger.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="p-20 rounded-full z-10 relative ml-3"
      ></div>
      <div className="py-36 px-24 bg-green-700 shadow-2xl -mt-10 relative rounded-xl">
        <div className="text-2xl text-white absolute top-14 right-14">
          {name}
        </div>
        <div className="text-xl text-white absolute top-30 right-12">
          {description}
        </div>
        <div className="text-xl text-white absolute top-52 right-20">
          ${price}
        </div>
      </div>
    </div>
  )
}

export default ItemCard
