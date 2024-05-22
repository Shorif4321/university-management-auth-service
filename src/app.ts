import express, { Application, Request, Response, urlencoded } from "express"
import cors from 'cors'

const app: Application = express()
const port: Number = 3000


// middleware
app.use(cors());

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// testing
app.get('/', (req: Request, res: Response) => {
    res.send('working successfully')
})

export default app;