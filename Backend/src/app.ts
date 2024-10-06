import express from 'express';
import { createAccountController } from './controller/createAccout/createAccoutController';
import { getAccoutsController } from './controller/Accout';
import { LoginController } from './controller/login/login';
import { deleteAccoutController, desactiveAccoutController } from './controller/desactiveAccout.ts/desactiveAccout';
import validateToken from './middleware/jwtVeifyToken';
import { transactionController } from './controller/transaction/transaction';
const app = express();

app.use(express.json());

app.post('/createAccout', (req, res) => {createAccountController(req, res)});
app.get('/accouts', (req, res) => {getAccoutsController(req, res)});
app.post('/login', (req, res) => {LoginController(req, res)});
app.patch('/desactiveAccout/:id' , validateToken, (req, res) => {desactiveAccoutController(req, res)});
app.post('/transaction', validateToken, (req, res) => {transactionController(req, res)});
app.delete('/delete/:id', (req, res) => {deleteAccoutController})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})