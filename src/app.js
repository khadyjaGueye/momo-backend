const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const serviceRoute = require('./routes/services.route');
const errorHandler = require('./middlewares/errorHandler.middleware');
const codeErreurRoutes = require('./routes/codeErreur.route');
const videoRoutes = require('./routes/video.route');
const horaireRoutes = require('./routes/horaire.route');

app.use('/api/services', serviceRoute);
app.use('/api/code-erreurs', codeErreurRoutes);
app.use('/api/videos',videoRoutes);
app.use('/api/horaires', horaireRoutes);


// middleware global d’erreurs (toujours à la fin)
//app.use(errorHandler);

app.listen(3000, () => {
  console.log("🚀 Serveur démarré sur http://localhost:3000");
});

// middleware global d’erreurs (toujours à la fin)
app.use(errorHandler);

module.exports = app;

