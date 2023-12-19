import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

function isValidName(name) {
  return name && name.length > 0;
}

function isValidNumberRange(value, min, max) {
  return typeof value === "number" && value >= min && value <= max;
}

const validateFighterFields = (name, power, defense, health, sendBadRequest) => {
  if (!isValidName(name)) {
    return sendBadRequest(`Name must not be empty.`);
  }

  if (!isValidNumberRange(power, 1, 100)) {
    return sendBadRequest(`Power must be a number between 1 and 100.`);
  }

  if (!isValidNumberRange(defense, 1, 10)) {
    return sendBadRequest(`Defense must be a number between 1 and 10.`);
  }

  if (health !== undefined) {
    if (!isValidNumberRange(health, 80, 120)) {
      return sendBadRequest(`Health must be a number between 80 and 120.`);
    }
  } else {

    health = 100;
  }

  return null;
};

const createFighterValid = (req, res, next) => {
  const { sendBadRequest } = res.responseMiddleware;
  const { name, power, defense, health } = req.body;

  const existingName = fighterService.search({name});
  if (existingName) {
    return sendBadRequest('Name is already taken.');
  }

  for (const key in FIGHTER) {
    if (key !== "id" && key !== "health" && !req.body[key]) {
      return sendBadRequest(`Field ${key} is required.`)
    }
  }

  const validationError = validateFighterFields(name, power, defense, health, sendBadRequest);
  if (validationError) {
    return validationError;
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { sendBadRequest } = res.responseMiddleware;
  const { name, power, defense, health } = req.body;

  const field = name || power || defense || health;

  if (!field) {
    return sendBadRequest('At least one field from name.');
  }

  const validationError = validateFighterFields(name, power, defense, health, sendBadRequest);
  if (validationError) {
    return validationError;
  }

  next();
};

export { createFighterValid, updateFighterValid };
