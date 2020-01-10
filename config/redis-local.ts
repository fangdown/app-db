import * as IORedis from 'ioredis';
import { logger } from 'fd-framework';
const log = logger.get('framework');

const config = {
  alias: 'app-redis',
  port: 6379, // Redis port
  host: '148.70.216.46', // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: 'fang674123',
  db: 0,
};
const init = () => {
  const client = new IORedis(config);
  client.on('connect', () => {
    const msg = 'Connected';
    log.info(`[${config.alias}]: ${msg}`);
  });

  client.on('ready', () => {
    const msg = 'Ready';
    log.info(`[${config.alias}]: ${msg}`);
  });

  client.on('reconnecting', () => {
    const msg = 'Reconnecting';
    log.info(`[${config.alias}]: ${msg}`);
  });

  client.on('end', () => {
    const msg = 'Closed';
    log.info(`[${config.alias}]: ${msg}`);
  });

  client.on('error', (err: Error) => {
    log.error(`[${config.alias}]: ${err.message}`);
  });
};
export default { init };
