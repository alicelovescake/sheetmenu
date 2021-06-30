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
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
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
      name: 'Your SheetMenu',
      mimeType: 'application/vnd.google-apps.spreadsheet',
    },
    media: {
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      body: fs.createReadStream('src/templates/sheetmenu-template.xlsx'),
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

export const getSheetsFromGoogleAPI = async ({ spreadsheetId }) => {
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

  const values = [
    ['User Name', userName],
    ['Restaurant Name', restaurantName],
    ['Street Address', address.addressStreet],
    ['Apartment, suite, etc', address.addressNumber],
    ['City', address.city],
    ['State/Province', address.state],
    ['Country', address.country],
    ['ZIP/postal code', address.postalCode],
  ]

  const body = {
    values: values,
  }

  await sheetClient.spreadsheets.values.update({
    spreadsheetId,
    range: [`Business Info!A1:B8`],
    valueInputOption: 'RAW',
    resource: body,
  })
}

export const getBusInfoFromGoogleAPI = async ({ spreadsheetId }) => {
  const sheetClient = await createGoogleSheetClient()

  const { data: busInfo } = await sheetClient.spreadsheets.values.get({
    spreadsheetId,
    range: [`Business Info!A1:B14`],
  })

  const busInfoData = {
    id: encodeURI(`${busInfo.values[0][1]}-${busInfo.values[1][1]}`),
    address: {},
  }

  for (const [key, value] of busInfo.values) {
    switch (key) {
      case 'User Name':
        busInfoData.userName = value || null
        break
      case 'Restaurant Name':
        busInfoData.name = value || null
        break
      case 'Street Address':
        busInfoData.address.addressStreet = value || null
        break
      case 'Apartment, suite, etc':
        busInfoData.address.addressNumber = value || null
        break
      case 'City':
        busInfoData.address.city = value || null
        break
      case 'State/Province':
        busInfoData.address.state = value || null
        break
      case 'Country':
        busInfoData.address.country = value || null
        break
      case 'ZIP/postal code':
        busInfoData.address.postalCode = value || null
        break
      case 'Phone number':
        busInfoData.phone = value || null
        break
      case 'Restaurant Description (3 sentences max)':
        busInfoData.description = value || null
        break
      case 'Value Prop 1':
        busInfoData.valueProp1 = value || null
        break
      case 'Value Prop 2':
        busInfoData.valueProp2 = value || null
        break
      case 'Value Prop 3':
        busInfoData.valueProp3 = value || null
        break
    }
  }

  return busInfoData
}
