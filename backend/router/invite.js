const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUserByToken = require("../middleware/authenticate");

router.post("/invitations", authenticateUserByToken, userController.inviteUser);
router.get("/invitations", authenticateUserByToken, userController.getInvitedUser);
router.put("/admin/confirm", authenticateUserByToken, userController.confirmAdmin);
router.get("/non-admin", authenticateUserByToken, userController.getAllUsersOtherThenAdmin);

module.exports = router;
