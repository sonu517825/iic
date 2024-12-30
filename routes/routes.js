const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const auth = require("../middleware/auth");

// POST `/api/login`
router.post("/login", controller.login);

// POST `/api/submissions`

router.post("/submissions", controller.postSubmissions);
 
// GET `/api/submissions`
router.get("/submissions", controller.getSubmissions);

// PATCH `/api/submissions/:id`

router.patch("/submissions/:id", controller.updateSubmissions);

// DELETE `/api/submissions/:id`
router.delete("/submissions/:id", auth, controller.deleteSubmissions);

module.exports = router;
