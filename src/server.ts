import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors'
import http from 'http'

import { config } from './config'
const server: Application = express()

const StartServer = () => {
 server.use((req: Request, res: Response, next: NextFunction) => {
  /** Log The Request */
  console.log(`Incoming => Method [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
   /** Log The Response */
   console.log(`Incoming => Method [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
  });
  next()
 })

 server.use(express.urlencoded({ extended: true }));
 server.use(express.json());
 // Enable CORS for all routes
 server.use(cors({ credentials: true, origin: config.server.url }))

 /** Rules of our API */
 server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if(req.method == 'OPTIONS') {
   res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
   return res.status(200).json({})
  }

  next()
 })

 /** Routes  */
 // Add the routes here

 	/** API Check */
  // Test if the server is online
  server.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'pong' }));

 /** Error Handling */
 server.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found')
  console.error(error)

  return res.status(404).json({ message: error.message })
 })

 /** Listening on Server Port ???? */
 http.createServer(server).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`))
}

StartServer()
