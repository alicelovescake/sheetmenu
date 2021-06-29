import { google } from 'googleapis'
import fs from 'fs'

const createGoogleDriveClient = async () => {
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

  return driveClient
}

const createGoogleSheetClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const authClient = await auth.getClient()

  const sheetClient = google.sheets({
    version: 'v4',
    auth: authClient,
  })

  return sheetClient
}

export const createSheetGoogleAPI = async () => {
  const driveClient = await createGoogleDriveClient()

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

  return sheet
}

export const getMenuFromGoogleAPI = async ({ spreadsheetId }) => {
  const sheetClient = await createGoogleSheetClient()
  const sheets = await sheetClient.spreadsheets.get({ spreadsheetId })

  return sheets.data.sheets
}

export const getMenuDataFromGoogleAPI = async ({ spreadsheetId, name }) => {
  const sheetClient = await createGoogleSheetClient()

  const { data: menuData } = await sheetClient.spreadsheets.values.get({
    spreadsheetId,
    range: [`${name}!A:D`],
  })

  return (
    menuData.values?.slice(1).map(([name, description, price, image]) => ({
      id: encodeURI(`${name}-${price}`),
      name,
      description,
      price,
      image,
    })) || []
  )
}

export const updateSheetFromGoogleAPI = async ({
  restaurantName,
  address,
  userName,
  spreadsheetId,
}) => {
  const sheetClient = await createGoogleSheetClient()

  const values = []

  const body = {
    values: values,
  }

  await sheetClient.spreadsheets.values.update({
    spreadsheetId,
    range: [`Business Info!A:B`],
    resource: body,
  })
}
