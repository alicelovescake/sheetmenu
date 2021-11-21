import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { VscLoading } from 'react-icons/Vsc'
import { useForm } from 'react-hook-form'
import { Form, Submit } from '@redwoodjs/forms'
import { navigate, Redirect, routes } from '@redwoodjs/router'

const SUBSCRIBE_USER = gql`
  mutation createSessionMutation($input: CreateCheckoutSessionInput!) {
    createCheckoutSession(input: $input)
  }
`
const SubscriptionSettings = () => {
  const [subscribe, { loading }] = useMutation(SUBSCRIBE_USER)
  const [subscribed, setSubscribed] = useState('Subscribe Now')
  const formMethods = useForm()

  if (loading) {
    return (
      <VscLoading className="animate-spin text-8xl text-green-700 mx-auto h-screen" />
    )
  }
  const onSubmit = async () => {
    const testMonthlyPriceId = 'price_1JtImLL0VIDl9kuolU9h47jP'
    const liveMontlyPriceId = 'price_1Jy2WHL0VIDl9kuouIAEJNyC'
    const response = await subscribe({
      variables: {
        input: {
          priceId: testMonthlyPriceId,
        },
      },
    })
    setSubscribed('Subscribed')
    window.location.href = response.data?.createCheckoutSession
  }

  return (
    <div>
      <h2 className="font-bold pb-10 pl-2 text-2xl">Subscription Settings</h2>
      <Form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg space-y-4"
        formMethods={formMethods}
      >
        <Submit
          className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75"
          disabled={loading}
        >
          {subscribed}
        </Submit>
      </Form>
    </div>
  )
}

export default SubscriptionSettings
