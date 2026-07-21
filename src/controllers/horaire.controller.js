const horaireService = require('../services/horaire.service');

exports.create = async (req, res) => {
  try {
    const horaire = await horaireService.createHoraire({
      jour: req.body.jour,
      heureDebut: req.body.heureDebut,
      heureFin: req.body.heureFin,
    });
    res.status(201).json({ data: { "horaire":horaire } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erreur lors de la création de l'horaire" });
  }
};

exports.getHoraires = async (req, res) => {
  try {
    const horaires = await horaireService.getAllHoraires();
    res.json({ data: { horaires } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHoraire = async (req, res) => {
  try {
    const horaire = await horaireService.getHoraireById(req.params.id);
    if (!horaire) return res.status(404).json({ message: 'Horaire not found' });
    res.json({ data: { horaire } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHoraire = async (req, res) => {
  try {
    const updatedHoraire = await horaireService.updateHoraire(req.params.id, {
      jour: req.body.jour,
      heureDebut: req.body.heureDebut,
      heureFin: req.body.heureFin,
    });
    res.json({ data: { horaire: updatedHoraire } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHoraire = async (req, res) => {
  try {
    await horaireService.removeHoraire(req.params.id);
    res.json({ message: 'Horaire deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
