import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import { connectPassport } from './utils/provider.js'
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import orderRoute from './routes/order.js'

const app = express()
export default app

dotenv.config({
    path: './config/config.env'
})
app.use(express.json())

app.use(function (req, res, next) {
    if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    else res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Google Authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     secure: process.env.NODE_ENV === "development" ? false : true,
    //     httpOnly: process.env.NODE_ENV === "development" ? false : true,
    //     sameSite: process.env.NODE_ENV === "development" ? false : true
    // }
}))

app.use(cookieParser())

app.use(passport.authenticate('session'))
app.use(passport.initialize())
app.use(passport.session())

connectPassport()

app.use('/api', userRoute)

// Order
app.use(urlencoded({
    extended: true
}))

app.use('/api', orderRoute)

app.use(errorMiddleware)