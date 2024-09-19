// getting-started.js
import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorLogger } from './shared/logger'

// const port = 3000

// 3F3a04iO6WLe0d8F  university-admin

async function bootstrap() {
  try {
    await mongoose.connect(config.database_Url as string)
    logger.info(`🛢 Database is Connected Successfully`)

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed To to database', err)
  }
}

bootstrap()
