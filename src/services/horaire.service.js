const prisma = require("../config/prisma");

async function createHoraire(data) {
  return await prisma.horaire.create({ data });
}

async function getAllHoraires() {
  return await prisma.horaire.findMany();
}

async function getHoraireById(id) {
  return await prisma.horaire.findUnique({ where: { id: Number(id) } });
}

async function updateHoraire(id, data) {
  return await prisma.horaire.update({
    where: { id: Number(id) },
    data,
  });
}

async function removeHoraire(id) {
  return await prisma.horaire.delete({ where: { id: Number(id) } });
}

module.exports = {
  createHoraire,
  getAllHoraires,
  getHoraireById,
  updateHoraire,
  removeHoraire,
};
