import { useMutation } from '@redwoodjs/web'
import { VscLoading } from 'react-icons/Vsc'

const SUBSCRIBE_USER = gql`
  mutation createSessionMutation($input: CreateCheckoutSessionInput!) {
    createCheckoutSession(input: $input)
  }
`
const MANAGE_BILLING = gql`
  mutation manageBilling {
    createPortalSession
  }
`
const SubscriptionSettings = ({ update, data }) => {
  const [subscribe, { loading }] = useMutation(SUBSCRIBE_USER)
  const [manageBilling] = useMutation(MANAGE_BILLING)

  if (loading) {
    return (
      <VscLoading className="animate-spin text-8xl text-green-700 mx-auto h-screen" />
    )
  }
  const handleSubscribe = async () => {
    const testMonthlyPriceId = 'price_1JtImLL0VIDl9kuolU9h47jP'
    // const liveMontlyPriceId = 'price_1Jy2WHL0VIDl9kuouIAEJNyC'
    const response = await subscribe({
      variables: {
        input: {
          priceId: testMonthlyPriceId,
        },
      },
    })
    window.location.href = response.data?.createCheckoutSession
  }

  const handleBilling = async () => {
    const response = await manageBilling()
    window.location.href = response.data?.createPortalSession
  }

  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      <h2 className="font-bold pb-10 pl-2 text-2xl">Subscription Settings</h2>

      <button
        className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75 block"
        disabled={loading}
        onClick={handleSubscribe}
      >
        {data?.user.subscribed ? 'Subscribed' : 'Subscribe Now'}
      </button>
      {data?.user.subscribed && (
        <button
          className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75"
          onClick={handleBilling}
        >
          Manage Billing
        </button>
      )}
    </div>
  )
}

export default SubscriptionSettings
