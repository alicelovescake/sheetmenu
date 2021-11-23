import { stripe } from 'src/lib/stripe'
import { requireAuth } from 'src/lib/auth'

export const createCheckoutSession = async ({ input }) => {
  const { priceId } = input

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url:
      'http://localhost:8910/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:8910/checkout/cancelled',
  })

  return session.url
}

export const getStripeCustomer = async ({ sessionURL }) => {
  const session = await stripe.checkout.sessions.retrieve(sessionURL)
  const customer = await stripe.customers.retrieve(session.customer)
  return customer.name
}

export const createPortalSession = async () => {
  requireAuth()
  const session = await stripe.billingPortal.sessions.create({
    customer: context.currentUser.stripeId,
    return_url: 'http://localhost:8910/settings',
  })

  return session.url
}
