import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid, updateUserValid
} from "../middlewares/user.validation.middleware.js";

const router = Router();

router.post('/', createUserValid, (req, res) => {
  const { sendSuccess,sendBadRequest, sendNotFound } = res.responseMiddleware;

  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const newUser = userService.createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    if(newUser) {
      return sendSuccess(newUser)
    } else {
      return sendNotFound('No user found');
    }

  } catch (error) {
    console.error(error);
    sendBadRequest('Internal Server Error');
  } 
});

router.get('/', (req, res) => {
  const { sendSuccess, sendNotFound } = res.responseMiddleware;

  try {
    const allUsers = userService.getAllUsers();
    if (allUsers.length > 0) {
      sendSuccess(allUsers);
    } else {
      sendNotFound('No users found');
    }
  } catch (error) {
    console.error(error);
    sendBadRequest('Internal Server Error');
  } 
});

router.get('/:id', (req, res) => {
  const { sendSuccess,sendBadRequest, sendNotFound } = res.responseMiddleware;
  try {
    const userId = req.params.id;
    const user = userService.search({id: userId});
    if (user) {
      sendSuccess(user);
    } else {
      sendNotFound(`User with id ${userId} not found`);
    }
  } catch (error) {
    console.error(error);
    sendBadRequest('Internal Server Error');
  }
});

router.put('/:id',  updateUserValid,  (req, res) => {
  const { sendSuccess, sendBadRequest, sendNotFound } = res.responseMiddleware;

  try {
    const userId = req.params.id;
    const data = req.body;
    const user = userService.updateUser(userId, data);

    if (user) {
      sendSuccess(user);
    } else {
      sendNotFound(`User with id ${userId} not found`);
    }
  } catch (error) {
    console.error(error);
    sendBadRequest('Internal Server Error');
  } 
});

router.delete('/:id', (req, res) => {
  const { sendSuccess, sendNotFound, sendBadRequest } = res.responseMiddleware;

  try {
    const userId = req.params.id;
    const deletedUser = userService.deleteUser(userId);

    if (deletedUser) {
      sendSuccess(deletedUser);
    } else {
      sendNotFound(`User with id ${userId} not found`);
    }
  } catch (error) {
    console.error(error);
    sendBadRequest('Internal Server Error');
  }
});

export { router };
