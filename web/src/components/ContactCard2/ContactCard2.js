const ContactCard2 = ({ address, busInfo }) => {
  return (
    <div className="font-bold text-center text-base pb-4 absolute bottom-0 left-12">
      <div className="text-xl font-black pb-8 text-center">
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
      <div className="text-xl font-black py-8">Contact Us!</div>
      <div>{busInfo.phone}</div>
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

export default ContactCard2
