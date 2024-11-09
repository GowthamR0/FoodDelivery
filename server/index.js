import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database/connection';
import passport from 'passport';
import session from 'express-session';

//config
import googleConfig from './config/google.config';
import routeConfig from './config/route.config';

//auth api
import Auth from './API/Auth/index';
import Restaurant from './API/Restaurant/index';
import Food from './API/Food/index';
import Menu from './API/Menu/index';
import Image from './API/Image/index';
import Review from './API/Review/index';
import Order from './API/Order/index';
import User from './API/User/index';
//   origin: ['http://localhost:5173','https://food-delivery-sand.vercel.app','https://www.zomato.com/coimbatore/hotel-chola-1-gandhipuram/order?contextual_menu_params=eyJkaXNoX3NlYXJjaCI6eyJ0aXRsZSI6IkJlc3QgaW4gQmlyeWFuaSIsImRpc2hfaWRzIjpbIjMwMzA4Il0sImN1aXNpbmVfaWRzIjpbXX19'], // Whitelist specific origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable passing cookies and headers
//   optionsSuccessStatus: 204, // Return a 204 status for preflight requests
// };


const zomato = express();

zomato.use(cors({
  origin: ['http://localhost:5173','https://food-delivery-frontend-tau.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));

zomato.use(helmet());
zomato.use(
  session({
    secret: "MySuperSecretKey123!@#",
    resave: true,
    saveUninitialized: true,
  })
);
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleConfig(passport);
routeConfig(passport);


//auth for zomato
zomato.use('/auth', Auth);
zomato.use('/restaurant', Restaurant);
zomato.use('/food', Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use('/review', Review);
zomato.use('/user', User);

zomato.get('/', (req, res) => res.json({ mess: "connected it yaya" }));

zomato.listen(4000, () =>
  connectDB().then(() => console.log("server is running"))
    .catch((error) => console.log(error.message))
);