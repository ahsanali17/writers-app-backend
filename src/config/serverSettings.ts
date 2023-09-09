import dotenv from 'dotenv'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000
export const CLIENT_URL = process.env.CLIENT_URL || ''

export const config = {
 server: {
  url: CLIENT_URL,
  port: SERVER_PORT
 }
}

export default config
