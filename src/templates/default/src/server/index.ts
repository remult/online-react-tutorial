import express from 'express'
import { api } from './api.js'
import session from 'cookie-session'
import { auth } from './auth'
export const app = express()
app.use(
  session({
    secret: process.env['SESSION_SECRET'] || 'my secret',
  })
)
app.use(auth)
app.use(api)
