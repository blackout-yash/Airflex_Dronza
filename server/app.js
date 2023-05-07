import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import { connectPassport } from './utils/provider.js'
import userRoute from './routes/user.js'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import orderRoute from './routes/order.js'
import message from './routes/message.js'
import cors from "cors";
import MongoStore from 'connect-mongo';

const app = express();
export default app

dotenv.config({
    path: './config/config.env'
})

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
    extended: true
}));

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
    }
}));


app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

app.use('/api', userRoute);
app.use('/api', orderRoute);
app.use('/api', message);

app.use(errorMiddleware);