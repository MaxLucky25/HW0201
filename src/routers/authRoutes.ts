import { Router, Request, Response } from "express";
import {loginValidators} from "../validators/loginValidators";
import {inputCheckErrorsMiddleware} from "../middlewaries/validationMiddleware";
import { userService } from "../services/userService";


export const authRouter = Router();


authRouter.post('/login',
    loginValidators,
    inputCheckErrorsMiddleware,
    async (req: Request, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const isAuthenticated = await userService.loginUser(loginOrEmail, password);
    if (isAuthenticated) {
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
});


