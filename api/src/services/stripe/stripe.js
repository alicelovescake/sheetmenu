import { stripe } from 'src/lib/stripe'

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
