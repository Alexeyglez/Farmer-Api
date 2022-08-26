import { Router } from "express";

const router = Router();

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productsContoller.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";

router
  .route("/")
  .get(authenticateUser, getAllProducts)
  .post([authenticateUser, authorizePermissions("admin")], createProduct);

router
  .route("/:id")
  .get(authenticateUser, getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);

export default router;
