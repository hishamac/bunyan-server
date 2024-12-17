import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      // Optional configurations
      maxRetriesPerRequest: null,
      retryStrategy: (times) => Math.min(times * 100, 5000), // Retry every 100ms, max 5 seconds
    });

    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }

  getClient(): Redis {
    return this.redis;
  }

  // Helper methods for common operations
  async set(key: string, value: any, ttl?: number): Promise<'OK'> {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
      return this.redis.set(key, stringValue, 'EX', ttl);
    }
    return this.redis.set(key, stringValue);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value, this.customJSONReviver) as T;
    } catch {
      return value as T;
    }
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  // Stream-based key deletion
  async deleteByPattern(pattern: string): Promise<void> {
    const stream = this.redis.scanStream({ match: pattern });
    stream.on('data', async (keys: string[]) => {
      if (keys.length) {
        await this.redis.del(keys);
      }
    });

    return new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });
  }

  customJSONReviver(key: string, value: any): any {
    // Check if the value is a string in ISO 8601 format
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return new Date(value); // Convert to Date object
    }
    return value;
  }
  
}
