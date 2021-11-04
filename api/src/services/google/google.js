import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

const createGoogleAuth = (scopes) => {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    },
    scopes,
  })
}

const createGoogleDriveClient = async () => {
  const auth = createGoogleAuth(['https://www.googleapis.com/auth/drive'])

  const driveClient = google.drive({
    version: 'v3',
    auth: await auth.getClient(),
  })

  return driveClient
}

const createGoogleSheetClient = async () => {
  const auth = createGoogleAuth([
    'https://www.googleapis.com/auth/spreadsheets',
  ])

  const sheetClient = google.sheets({
    version: 'v4',
    auth: await auth.getClient(),
  })

  return sheetClient
}

export const createSheet = async (name) => {
  const driveClient = await createGoogleDriveClient()

  const sheet = await driveClient.files.create({
    resource: {
      name: `${name}'s SheetMenu`,
      mimeType: 'application/vnd.google-apps.spreadsheet',
    },
    media: {
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      body: fs.createReadStream(
        path.resolve(
          __dirname,
          '../../../src/templates/sheetmenu-template.xlsx'
        )
      ),
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
    fileId: sheet.data.id,
    fields: 'id',
  })

  return sheet
}

export const getSheets = async ({ spreadsheetId }) => {
  const sheetClient = await createGoogleSheetClient()
  const sheets = await sheetClient.spreadsheets.get({ spreadsheetId })

  return sheets.data.sheets
}

export const getMenuData = async ({ spreadsheetId, name }) => {
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

export const updateSheet = async ({
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
    values,
  }

  await sheetClient.spreadsheets.values.update({
    spreadsheetId,
    range: [`Business Info!A1:B8`],
    valueInputOption: 'RAW',
    resource: body,
  })
}

export const getBusInfo = async ({ spreadsheetId }) => {
  const sheetClient = await createGoogleSheetClient()

  const { data: busInfo } = await sheetClient.spreadsheets.values.get({
    spreadsheetId,
    range: [`Business Info!A1:B21`],
  })

  const busInfoData = {
    id: encodeURI(`${busInfo.values[0][1]}-${busInfo.values[1][1]}`),
    address: {},
    hours: {},
  }

  for (const [key, value] of busInfo.values) {
    switch (key) {
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
      case 'Hero Picture':
        busInfoData.headerPic = value || null
        break
      case 'Hours of Operation: Monday':
        busInfoData.hours.monday = value || null
        break
      case 'Hours of Operation: Tuesday':
        busInfoData.hours.tuesday = value || null
        break
      case 'Hours of Operation: Wednesday':
        busInfoData.hours.wednesday = value || null
        break
      case 'Hours of Operation: Thursday':
        busInfoData.hours.thursday = value || null
        break
      case 'Hours of Operation: Friday':
        busInfoData.hours.friday = value || null
        break
      case 'Hours of Operation: Saturday':
        busInfoData.hours.saturday = value || null
        break
      case 'Hours of Operation: Sunday':
        busInfoData.hours.sunday = value || null
        break
    }
  }

  return busInfoData
}
