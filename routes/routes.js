import { router as authRoutes } from "./authRoutes.js";
import { router as fighterRoutes } from "./fighterRoutes.js";
import { router as fightRoutes } from "./fightRoutes.js";
import { router as userRoutes } from "./userRoutes.js";

const initRoutes = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/fighters", fighterRoutes);
  app.use("/api/fights", fightRoutes);
  app.use("/api/auth", authRoutes);
};

export { initRoutes };
