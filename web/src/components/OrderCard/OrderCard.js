const OrderCard = ({ address }) => {
  return (
    <div className="bg-green-700 text-white text-center p-20 mt-20 rounded-2xl">
      <h2 className="font-extrabold text-3xl pb-8">Contact Us!</h2>
      <h2 className="font-bold text-xl pb-4">
        We&apos;d love to hear from you.
      </h2>
      <div>
        {address.addressNumber} {address.addressStreet}
      </div>
      <div>
        {address.city}, {address.state}, {address.country}
      </div>
      <div>{address.postalCode}</div>
    </div>
  )
}

export default OrderCard
