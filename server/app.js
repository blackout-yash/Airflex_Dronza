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

const app = express()
export default app
app.use(cookieParser());
dotenv.config({
    path: './config/config.env'
})
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
// app.enable("trust proxy");

// app.use(function (req, res, next) {
//     if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     else res.setHeader('Access-Control-Allow-Origin', "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     next();
// });

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     // cookie: {
//     //     secure: process.env.NODE_ENV === "development" ? false : true,
//     //     httpOnly: process.env.NODE_ENV === "development" ? false : true,
//     //     sameSite: process.env.NODE_ENV === "development" ? false : "none",
//     //     domain: "test-khaki-theta-25.vercel.app"
//     // }
// }));


app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

app.use('/api', userRoute);

app.use(urlencoded({
    extended: true
}));

app.use('/api', orderRoute);
app.use('/api', message);

app.use(errorMiddleware);