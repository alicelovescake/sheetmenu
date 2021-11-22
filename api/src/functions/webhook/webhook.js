import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
import { stripe } from 'src/lib/stripe'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event) => {
  logger.info('Invoked webhook function')

  let data
  let eventType
  let customer

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (webhookSecret) {
    let receivedEvent
    let signature = event.headers['stripe-signature']

    try {
      receivedEvent = stripe.webhooks.constructEvent(
        event.body,
        signature,
        webhookSecret
      )
    } catch (err) {
      console.log('webhook sig verification failed')
    }
    data = receivedEvent.data
    eventType = receivedEvent.type
    customer = await stripe.customers.retrieve(data.object.customer)
  }

  switch (eventType) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
      await db.user.update({
        data: {
          stripeId: data.object.customer,
          stripeSubscriptionid: data.object.id,
        },
        where: {
          email: customer.email,
        },
      })
      console.log('checkout.session.completed')
      break
    default:
      console.error('invalid stripe id')
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      data,
    }),
  }
}
