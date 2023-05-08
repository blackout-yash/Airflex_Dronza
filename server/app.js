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

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     proxy: true,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
//     // cookie: {
//     //     secure: process.env.NODE_ENV === "development" ? false : true,
//     //     httpOnly: process.env.NODE_ENV === "development" ? false : true,
//     //     sameSite: process.env.NODE_ENV === "development" ? false : "none",
//     // }
// }));

// 
// app.use(passport.authenticate('session'));
// app.use(passport.initialize());
// app.use(passport.session());

// connectPassport();

app.set("trust proxy", 1);

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
        }
    }))


import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from './models/User.js'

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        // Whatever we return goes to the client and binds to the req.user property
        return done(null, doc);
    })
})


passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URI}`
},
    function (_, __, profile, cb) {

        User.findOne({ googleId: profile.id }, async (err, doc) => {

            if (err) {
                return cb(err, null);
            }

            if (!doc) {
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    photo: profile.photos[0].value
                });

                await newUser.save();
                cb(null, newUser);
            }
            cb(null, doc);
        })

    }));

app.use('/api', userRoute);
app.use('/api', orderRoute);
app.use('/api', message);

app.use(errorMiddleware);