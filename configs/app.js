require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
console.log('process.env.SECRET: ', process.env.NODE_ENV)
const config = {
  hostname: require('os').hostname(),
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL,
  webAppUrl: process.env.WEBAPP_URL,
  isProduction: process.env.NODE_ENV === 'production',
  apiVersion: process.env.API_VERSION || 1,
  tokenExpDays: process.env.TOKEN_EXP_DAYS || 1,
  secret: process.env.SECRET,
  mongodbUri: process.env.MONGODB_URI,
  limitPage: process.env.LIMIT_PAGE || 15,
  dbUsername: process.env.DB_USERNAME,
  dbHostname: process.env.DB_HOSTNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  lineMessagingAPI: {
    appName: process.env.LINE_MSG_API_APPNAME,
    channelAccessToken: process.env.LINE_MSG_API_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_MSG_API_CHANNEL_SECRET,
    channelID: process.env.LINE_MSG_API_CHANNEL_ID,
  },
}

module.exports = config
