// getting-started.js
import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

// const port = 3000

// 3F3a04iO6WLe0d8F  university-admin

async function bootstrap() {
  try {
    await mongoose.connect(config.database_Url as string)
    console.log(`🛢 Database is Connected Successfully`)

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed To to database', err)
  }
}

bootstrap()
