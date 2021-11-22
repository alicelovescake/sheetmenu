import { useQuery } from '@redwoodjs/web'

const GET_STRIPE_CUSTOMER_NAME = gql`
  query getStripeCustomer($sessionURL: String!) {
    getStripeCustomer(sessionURL: $sessionURL)
  }
`

const CheckoutPage = () => {
  const sessionURL = getURLParameter()
  const { data } = useQuery(GET_STRIPE_CUSTOMER_NAME, {
    variables: { sessionURL },
  })

  return (
    <div className="flex justify-center">
      <span className="text-2xl font-bold text-green-800 p-10 rounded-xl bg-green-200 m-0">
        {`Thanks for signing up, ${data?.getStripeCustomer}!`}
      </span>
    </div>
  )
}

const getURLParameter = () => {
  const pageURL = window.location.search.substring(1)
  const sessionName = pageURL.split('=')
  return sessionName[1]
}

export default CheckoutPage
