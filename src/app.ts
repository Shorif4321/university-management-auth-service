import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandelar from './middlewares/globalErrorHandelers'
import ApiError from './errors/ApiError'
const app: Application = express()

// midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', UserRoutes)

export default app

// Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new Error('Ore baba Api Error')
  throw new ApiError(400, 'Ore baba Something went wrong')
  // next('Api Error from API from test route') // Error
})

app.use(globalErrorHandelar)

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Working Successfully')
// })
