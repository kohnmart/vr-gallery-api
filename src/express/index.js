//Import
import express from 'express';
import session from 'express-session';
import galleries from './routes/gallery.js';
import user from './routes/user.js';
import image from './routes/image.js';
import auth from './routes/auth.js';
import dotenv from 'dotenv';
import passport from 'passport';
import checkLogin from './middlewares/auth/login.js';
import cookieParser from 'cookie-parser';
dotenv.config();

// Server
const app = express();

//Session
app.use(
  session({
    name: 'vr-gallery-cookie',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//OPEN ROUTE FOR AUTH
app.use('/api/auth', auth);
//PROTECTED ROUTES
app.use('/api/galleries', galleries);
app.use('/api/user', user);
app.use('/api/image', image);
app.use('/api/store', express.static('./store'));

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
