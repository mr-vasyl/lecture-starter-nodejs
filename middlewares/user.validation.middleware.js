import { USER } from "../models/user.js";

function isValidEmail(email) {
  return email && email.endsWith('@gmail.com');
}

function isValidPhoneNumber(phoneNumber) {
  return phoneNumber && /^(\+380\d{9})$/.test(phoneNumber);
}

function isValidPassword(password) {
  return password && password.length >= 3;
}

function isValidName(name) {
  return name && name.length >= 3;
}

function validateField(firstName, lastName, email, phoneNumber, password, sendBadRequest) {
  if (firstName && !isValidName(firstName)) {
    return sendBadRequest(`firstName must be at least 3 characters long.`);
  }

  if (lastName && !isValidName(lastName)) {
    return sendBadRequest(`lastName must be at least 3 characters long.`);
  }

  if (email && !isValidEmail(email)) {
    return sendBadRequest(`Invalid email format. Only Gmail addresses are allowed.`);
  }

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    return sendBadRequest(`Invalid phoneNumber format. Use +380xxxxxxxxx.`);
  }

  if (password && !isValidPassword(password)) {
    return sendBadRequest(`password must be at least 3 characters long.`);
  }

  return null;
}

const createUserValid = (req, res, next) => {
  const { sendBadRequest } = res.responseMiddleware;
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  for (const key in USER) {
    if (USER.hasOwnProperty(key) && key !== "id" && !req.body[key]) {
      return res.status(400).json({ error: true, message: `Field ${key} is required.` });
    }
  }

  const validationError = validateField(firstName, lastName, email, phoneNumber, password, sendBadRequest);
  if (validationError) {
    return validationError;
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { sendBadRequest } = res.responseMiddleware;
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const field = firstName || lastName || email || phoneNumber || password;

  if (!field) {
    return sendBadRequest('At least one field from should be present.');
  }

  const validationError = validateField(firstName, lastName, email, phoneNumber, password, sendBadRequest);
  if (validationError) {
    return validationError;
  }

  next();
};

const authUserValid = (req, res, next) => {
  const { sendBadRequest } = res.responseMiddleware;
  const { email, password } = req.body;

  const validationError = validateField(null, null, email, null, password, sendBadRequest);
  if (validationError) {
    return validationError;
  }

  next();
};

export { createUserValid, updateUserValid, authUserValid };
