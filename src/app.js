const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const serviceRoute = require('./routes/services.route');

app.use('/api/services', serviceRoute);


// middleware global d’erreurs (toujours à la fin)
//app.use(errorHandler);

app.listen(3000, () => {
  console.log("🚀 Serveur démarré sur http://localhost:3000");
});

module.exports = app;

