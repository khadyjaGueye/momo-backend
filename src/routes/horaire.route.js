const express = require('express');
const router = express.Router();
const horaireController = require('../controllers/horaire.controller');

router.post('/', horaireController.create);
router.get('/', horaireController.getHoraires);
router.get('/:id', horaireController.getHoraire);
router.put('/:id', horaireController.updateHoraire);
router.delete('/:id', horaireController.deleteHoraire);

module.exports = router;
