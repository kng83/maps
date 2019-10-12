import express from 'express';
//import {router} from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/RootController';
import {AppRouter} from './AppRouter';




const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({keys:['bobo4']}));
app.use(AppRouter.getInstance());

app.listen(3000,()=>console.log(`listen on port ${3000}`));