const prisma = require("../config/prisma");

async function createVideo(data) {
  return await prisma.video.create({ data });
}

async function getAllVideos() {
  return await prisma.video.findMany();
}

async function getVideoById(id) {
  return await prisma.video.findUnique({ where: { id: Number(id) } });
}

async function update(id, data) {
    return await prisma.video.update({
      where: { id: Number(id) },
      data,
    });
  }

async function remove(id) {
  return await prisma.video.delete({ where: { id: Number(id) } });
}

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  remove,
  update
};
