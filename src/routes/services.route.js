const express = require('express');

const router = express.Router();
const serviceController = require('../controllers/service.controller');
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);
router.post("/",upload.single("image"), serviceController.create);
router.put("/:id",upload.single("image"), serviceController.update);
router.delete("/:id", serviceController.remove);

module.exports = router;