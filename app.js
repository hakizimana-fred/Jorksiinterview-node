import express from 'express'
import configMiddleware from './middlewares/app.middleware.js'
import configPassportJwt from './config/passport.js'
import passport from 'passport'
import authRoutes from './routes/auth.js'
import { connectDB } from './config/db.js'



configPassportJwt(passport)

const main = async () => {
    try {

    const app = express()
    // connect to db
    // middlewares
    configMiddleware(app)
    app.use('/api/v1', authRoutes) // user routes (Login, Register)

    await connectDB()

    app.listen(5000, () => {
        console.log(`listening:*5000`)
    })
    }catch(e) {

    }
}

main().catch(e => console.error(e))