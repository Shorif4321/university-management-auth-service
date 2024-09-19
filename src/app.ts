import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandelar from './middlewares/globalErrorHandelers'

const app: Application = express()

// midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', UserRoutes)

export default app

app.use(globalErrorHandelar)

// Testing
app.get('/', async () => {
  throw new Error('testing error loager')
})

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})
