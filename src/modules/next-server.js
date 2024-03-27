import express from 'express';
import Logger from './logger';
import Input from './input';

class NextServer {
  constructor(logger) {
    this.logger = logger ?? new Logger();
    this._input = new Input(logger);
    this.app = {};
    this.handle = {};
    this.status = {};
    this.port = parseInt(process.env.PORT, 10) || 3000;
  }

  async setup() {
    const { default: next } = await import('next');
    this.app = next({ dev: false });
    this.handle = this.app.getRequestHandler();
  }

  /**
   * Run Next js server
   * @returns {Promise<unknown>}
   */
  run() {
    return new Promise((resolve, reject) => {
      this.app.prepare()
        .then(() => {
          const server = express();

          server.all('*', (req, res) => {
            return this.handle(req, res);
          });

          server.listen(this.port, err => {
            if (err) throw err;
            this.logger.info(`🚀  Ready on http://localhost:${this.port}\n`);
            resolve({ status: 'Active' });
          });
        })
        .catch(ex => {
          this.logger.error('❌  Error Starting Server\n');
          console.error(ex.stack);
          process.exit(1);
          reject(new Error('Error Starting Server'));
        });
    });
  }

  /**
   * Run server for next js.
   * Get the DOM from urls
   * @param {number} port
   * @param ignoreUrls
   * @returns {Promise<Promise.Array>}
   */
  async inputSSR(port, ignoreUrls = [], sitemap) {
    this.port = port;
    this.status = await this.run();
    const inputResult = this._input.spa(this.port, ignoreUrls, sitemap);
    return inputResult;
  }
}

export default NextServer;
