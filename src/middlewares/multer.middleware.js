const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Création automatique des dossiers si inexistants
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Configuration du stockage sur disque

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = 'uploads/videos';
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });

// Filtre pour accepter uniquement certains formats vidéo
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'video/mp4',
        'video/mpeg',
        'video/ogg',
        'video/webm',
        'video/quicktime'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format vidéo non autorisé'));
    }
};

// Limite de taille (exemple : 50 Mo)
const limits = {
    fileSize: 50 * 1024 * 1024 // 50 MB
};

module.exports = multer({ storage, fileFilter, limits });
