import express from 'express';
import { Router } from 'express';
import { verifyLogin } from '../../middleware/login';
import { LoginController } from '../../controller/login/login';

const loginRouter = Router();

loginRouter.post('/login', async (req, res) => {LoginController(req, res)});

export default loginRouter;