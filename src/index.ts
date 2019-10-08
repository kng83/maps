import express from 'express';
import { Response, Request } from 'express';
import {router} from './routes/loginRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

app.listen(3000,()=>console.log(`listen on port ${3000}`));