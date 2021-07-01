const OrderCard = ({ address, phone, busInfo }) => {
  return (
    <div className="bg-green-700 text-white p-20 mt-20 rounded-2xl flex justify-between">
      <div>
        <h2 className="font-extrabold text-3xl pb-8">Contact Us!</h2>
        <h2 className="font-bold text-xl pb-4">
          We&apos;d love to hear from you.
        </h2>
        <div>{phone}</div>
        <div>
          {address.addressNumber} {address.addressStreet}
        </div>
        <div>
          {address.city}, {address.state}, {address.country}
        </div>
        <div>{address.postalCode}</div>
      </div>
      <div>
        <div className="text-3xl font-black pb-8 text-center">
          Hours of Operation
        </div>
        <div className="text-centered pb-10">
          <div>Monday: {busInfo.hours.monday}</div>
          <div>Tuesday: {busInfo.hours.tuesday}</div>
          <div>Wednesday: {busInfo.hours.wednesday}</div>
          <div>Thursday: {busInfo.hours.thursday}</div>
          <div>Friday: {busInfo.hours.friday}</div>
          <div>Saturday: {busInfo.hours.saturday}</div>
          <div>Sunday: {busInfo.hours.sunday}</div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
