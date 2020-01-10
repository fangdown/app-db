import {
  redis,
  SERVICE_CODE,
  ERROR_CODE,
  ServiceError,
  logger,
} from 'fd-framework';
import * as config from 'fd-config';
// 授权类型，隐式和显式
export type Scope = '0' | '1'; // 0静默授权，其他显示授权
export const authRedis = config.get('redis.wechat');
// 授权缓存数据缓存有效期：60天
const CACHE_TIME = 24 * 60 * 60 * 60;
const log = logger.get('redis');

/**
 * 设置redis
 * @param session
 * @param key
 * @param value
 */
export async function setRedisData(
  key: string,
  value: Record<string, any> | string,
  cacheTime?: number
): Promise<any> {
  const redisClient = authRedis ? redis.get(authRedis) : null;
  if (!redisClient || !redisClient.isReady) {
    const msg = `redis ${redisClient ? redisClient.name : ''} connect failed`;
    throw new ServiceError(
      SERVICE_CODE.REDIS,
      ERROR_CODE.INTERNAL_SERVER_ERROR,
      msg
    );
  }
  const cacheKey = `${key}`;
  const cacheData = JSON.stringify(value);
  log.info('cacheData', cacheData);
  await redisClient.set(
    cacheKey,
    cacheData,
    cacheTime ? cacheTime : CACHE_TIME
  );
}

/**
 * redis取值
 * @param session
 * @param key
 * @param value
 */
export async function getRedisData(key: string): Promise<any> {
  const redisClient = authRedis ? redis.get(authRedis) : null;
  if (!redisClient || !redisClient.isReady) {
    const msg = `redis ${redisClient ? redisClient.name : ''} connect failed`;
    throw new ServiceError(
      SERVICE_CODE.REDIS,
      ERROR_CODE.INTERNAL_SERVER_ERROR,
      msg
    );
  }
  const cacheKey = `${key}`;
  log.info('cacheKey', cacheKey);
  try {
    const cacheData = await redisClient.get(cacheKey);
    return cacheData ? JSON.parse(cacheData) : '';
  } catch (e) {
    log.error('get Redis data failed:', e);
    return '';
  }
}
