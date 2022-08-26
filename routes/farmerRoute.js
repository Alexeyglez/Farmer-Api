import { Router } from "express";

const router = Router();

import {
  createFarmer,
  deleteFarmer,
  getAllFarmers,
  getSingleFarmer,
  updateFarmer,
} from "../controllers/farmersController.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

router
  .route("/")
  .get(authenticateUser, getAllFarmers)
  .post([authenticateUser, authorizePermissions("admin")], createFarmer);

router
  .route("/:id")
  .get(authenticateUser, getSingleFarmer)
  .delete([authenticateUser, authorizePermissions("admin")], deleteFarmer)
  .patch([authenticateUser, authorizePermissions("admin")], updateFarmer);

export default router;
