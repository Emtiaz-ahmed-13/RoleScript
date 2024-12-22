import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "../user/user.validation";


const authRouter = Router();
authRouter.post('/register', (req, res, next) => {
    console.log('Request received:', req.body); // Debug log
    next(); // Proceed to the middleware
}, validateRequest(UserValidation.userValidationSchema), AuthControllers.register);


authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);



export default authRouter;