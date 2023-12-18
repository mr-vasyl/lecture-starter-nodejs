import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  const { sendSuccess, sendNotFound } = res.responseMiddleware;

  try {
    const allFighters = fighterService.getAllFighters();
    if (allFighters.length > 0) {
      sendSuccess(allFighters);
    } else {
      sendNotFound("No fighters found");
    }
  } catch (error) {
    console.error(error);
    sendBadRequest("Internal Server Error");
  }
}); 

 router.get("/:id", (req, res) => {
  const { sendSuccess, sendNotFound, sendBadRequest } = res.responseMiddleware;
  try {
    const fighterId = req.params.id;
    const fighter = fighterService.search({id: fighterId});
    if (fighter) {
      sendSuccess(fighter);
    } else {
      sendNotFound(`Fighter with id ${fighterId} not found`);
    }
  } catch (error) {
    console.error(error);
    sendBadRequest("Internal Server Error");
  }
}); 

router.post("/", /* createFighterValid, */ (req, res) => {
  const { sendSuccess, sendNotFound, sendBadRequest } = res.responseMiddleware;

  try {
    const { name, power, defense, health } = req.body;
    const newFighter = fighterService.createFighter({ name, power, defense, health });
    if (newFighter) {
      sendSuccess(newFighter);
    } else {
      sendNotFound("No fighter found");
    }
  } catch (error) {
    console.error(error);
    sendBadRequest("Internal Server Error");
  }
});

router.put("/:id", updateFighterValid, (req, res) => {
  const { sendSuccess, sendNotFound, sendBadRequest } = res.responseMiddleware;

  try {
    const fighterId = req.params.id;
    const data = req.body;
    const updatedFighter = fighterService.updateFighter(fighterId, data);

    if (updatedFighter) {
      sendSuccess(updatedFighter);
    } else {
      sendNotFound(`Fighter with id ${fighterId} not found`);
    }
  } catch (error) {
    console.error(error);
    sendBadRequest("Internal Server Error");
  }
}); 

 router.delete("/:id", (req, res) => {
  const { sendSuccess, sendNotFound, sendBadRequest } = res.responseMiddleware;

  try {
    const fighterId = req.params.id;
    const deletedFighter = fighterService.deleteFighter(fighterId);

    if (deletedFighter) {
      sendSuccess(deletedFighter);
    } else {
      sendNotFound(`Fighter with id ${fighterId} not found`);
    }
  } catch (error) {
    console.error(error);
    sendBadRequest("Internal Server Error");
  }
}); 

export { router };
