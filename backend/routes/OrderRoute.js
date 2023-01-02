const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getAllOrder,
  getAdminAllOrder,
  updateAdminOrder,
  deleteOrder,
} = require("../controller/OrderController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, getAllOrder);

router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminAllOrder);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateAdminOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
