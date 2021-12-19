const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const db = require('./db');
const { PORT } = require('./constants');
const swaggerSpec = require('./config/swaggerConfig');

const app = express();

app.use(cors());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db.initDb().then(() => app.listen(PORT, async () => {
  console.log(`Recruitment app listening on port ${PORT}`);
}));
