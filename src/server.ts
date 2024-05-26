import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`🛢 Database connected successfully`)
    app.listen(config.path, () => {
      console.log(`Application listening on port ${config.path}`)
    })
  } catch (error) {
    console.log('Faild to connected database', error)
  }
}

bootstrap()
