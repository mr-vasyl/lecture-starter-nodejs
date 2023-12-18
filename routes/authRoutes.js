import { Router } from "express";
import { authService } from "../services/authService.js";
import {
  authUserValid
} from "../middlewares/user.validation.middleware.js";
const router = Router();

router.post("/login", authUserValid, (req, res, next) => {
    const { sendSuccess,sendBadRequest, sendNotFound } = res.responseMiddleware;
    try {
      const userData = req.body;
      const user = authService.login(userData); 
      if(user) {
        return sendSuccess(user)
      } else {
        return sendNotFound('No user found');
      }
    } catch (err) {
      console.error(err);
      sendBadRequest('Internal Server Error. The user does not exist');
    } finally {
      next()
    }
});

export { router };
