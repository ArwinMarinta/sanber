const router = require("express").Router();
const user = require("../controller/user");
const { verifyToken } = require("../middleware/auth");

router.get("/profile/:id", verifyToken, user.userById);

module.exports = router;
