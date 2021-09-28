import express from 'express';
import path from 'path';
import Logger from './logger';

const app = express();
const port = 3000;

const logger = new Logger();

export function startServer(folder) {
  app.use(express.static(folder));

  // sendFile will go here
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  app.listen(port);

  logger.info(`🚀  Server started on port ${port}\n`);

  logger.success('✅  Done\n');
}
