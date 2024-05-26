import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/user/users.route'
const app: Application = express()

// middleware
app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', usersRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
