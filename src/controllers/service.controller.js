const serviceService = require("../services/service.service");
const supabase = require("../config/supabase");

async function uploadServiceImage(file) {
  const filename = `${Date.now()}-${file.originalname}`;
  const { error } = await supabase.storage
    .from("services")
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("services").getPublicUrl(filename);
  return data.publicUrl;
}

async function getAll(req, res) {
  const services = await serviceService.getAll();
  res.json({
    data: {
      success: true,
      "services": services,
    }
  });
}

async function getById(req, res) {
  const id = Number(req.params.id);
  const service = await serviceService.getById(id);
  res.json({
    data: {
      service: service
    }
  });
}

async function create(req, res) {
  try {
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadServiceImage(req.file);
    }
    const service = await serviceService.create({
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      duration: req.body.duration ? Number(req.body.duration) : null,
      image: imageUrl,
    });
    res.status(201).json({
      data: {
        "service": service
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erreur lors de la création du service" });
  }
}

async function update(req, res) {
  const id = Number(req.params.id);

  let imageUrl;

  if (req.file) {
    imageUrl = await uploadServiceImage(req.file);
  }

  const data = {
    name: req.body.name,
    price: Number(req.body.price),
    description: req.body.description,
    duration: req.body.duration ? Number(req.body.duration) : null,
  };

  if (imageUrl) {
    data.image = imageUrl;
  }

  const service = await serviceService.update(id, data);

  res.json({
    data: {
      "service": service,
    }
  });
}

async function remove(req, res) {
  const id = Number(req.params.id);
  await serviceService.remove(id);
  res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
