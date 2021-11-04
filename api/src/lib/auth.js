// Define what you want `currentUser` to return throughout your app. For example,
// to return a real user from your database, you could do something like:
//
//   export const getCurrentUser = async ({ email }) => {
//     return await db.user.findUnique({ where: { email } })
//   }

import { AuthenticationError } from '@redwoodjs/graphql-server'
import admin from 'firebase-admin'

import { user, createUser } from 'src/services/users/users'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const adminApp = admin.initializeApp(config)

export const getCurrentUser = async (decoded, { token }) => {
  if (!decoded) {
    return null
  }

  const { email, uid } = await adminApp.auth().verifyIdToken(token)

  let existingUser = await user({ email })

  if (!existingUser) {
    existingUser = await createUser({ email, firebaseId: uid })
  }

  return existingUser
}

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

export const requireAuth = () => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
