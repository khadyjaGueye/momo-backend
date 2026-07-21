// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');

const uploadVideo = require('../middlewares/multer.middleware');
const { put } = require('./video.route');

router.post('/', uploadVideo.single('video'), videoController.create);
router.get('/', videoController.getVideos);
router.get('/:id', videoController.getVideo);
router.put('/:id',videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
