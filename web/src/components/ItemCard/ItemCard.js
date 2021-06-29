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
      <div className="py-36 px-24 bg-green-700 shadow-2xl -mt-10 rounded-xl">
        <div className="text-2xl text-white relative top-1/4 right-8 ">
          {name}
        </div>
        <div className="text-xl text-white relative top-1/3 right-8">
          {description}
        </div>
        <div className="text-xl text-white relative top-3/4 right-1/2">
          ${price}
        </div>
      </div>
    </div>
  )
}

export default ItemCard
