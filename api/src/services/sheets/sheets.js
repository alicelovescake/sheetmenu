import { google } from 'googleapis'
import fs from 'fs'

import { requireAuth } from 'src/lib/auth'
import {
  updateRestaurant,
  restaurantByOwnerId,
} from '../restaurants/restaurants'

export const createSheet = async () => {
  requireAuth()

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  })

  const authClient = await auth.getClient()

  const driveClient = google.drive({
    version: 'v3',
    auth: authClient,
  })

  const sheet = await driveClient.files.create({
    resource: {
      name: 'SheetMenu.csv',
      mimeType: 'application/vnd.google-apps.spreadsheet',
    },
    media: {
      mimeType: 'text/csv',
      body: fs.createReadStream('src/templates/sheetmenu-template.csv'),
    },
  })

  if (!sheet?.data?.id) {
    return
  }

  await driveClient.permissions.create({
    resource: {
      type: 'user',
      role: 'writer',
      emailAddress: context.currentUser.email,
    },
    fileId: sheet?.data?.id,
    fields: 'id',
  })

  const currentRestaurant = await restaurantByOwnerId({
    ownerId: context.currentUser.id,
  })

  await updateRestaurant({
    id: currentRestaurant.id,
    input: { sheetId: sheet?.data?.id },
  })
}
