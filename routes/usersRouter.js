import express from "express";

import usersControllers from "../controllers/usersControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  registerUserSchema,
  loginUserSchema,
  refreshUserSchema,
} from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(registerUserSchema),
  usersControllers.registerUser
);

usersRouter.post(
  "/login",
  validateBody(loginUserSchema),
  usersControllers.loginUser
);

usersRouter.post(
  "/refresh",
  validateBody(refreshUserSchema),
  usersControllers.refreshUser
);

usersRouter.get("/user-info", authenticate, usersControllers.getCurrent);

usersRouter.get("/logout", authenticate, usersControllers.logoutUser);

export default usersRouter;
