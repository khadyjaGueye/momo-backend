const prisma = require("../config/prisma");

async function getAll() {
    return prisma.service.findMany();
}

async function getById(id) {
    return prisma.service.findUnique({ where: { id } });
}

async function create(data) {
    return prisma.service.create({ data });
}

async function update(id, data) {
    return prisma.service.update({ where: { id }, data });
}

async function remove(id) {
    return prisma.service.delete({ where: { id } });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};

