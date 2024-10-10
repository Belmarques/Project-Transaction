import express from 'express';
import { createAccountController } from './controller/createAccout/createAccoutController';
import { getAccoutsController } from './controller/Accout';
import loginRouter from './routes/login/loginRouter';
import { deactivateAccountController } from './controller/desactiveAccout.ts/desactiveAccout';
import validateToken from './middleware/jwtVeifyToken';
import { transactionController } from './controller/transaction/transaction';
import cors from 'cors';
import {verifyLogin} from './middleware/login'
import { getTransactionController } from './controller/transaction/getTransaction';
const app = express();

app.use(express.json());
app.use(cors());
app.post('/createAccout', (req, res) => {createAccountController(req, res)});
app.get('/accouts', (req, res) => {getAccoutsController(req, res)});
app.use(loginRouter)
app.patch('/desactiveAccout/:id' , validateToken, (req, res) => {deactivateAccountController(req, res)});
app.post('/transaction/:id', validateToken, (req, res) => {transactionController(req, res)});
app.get('/transaction/:id', validateToken,(req, res) => {getTransactionController(req, res)} )
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})