import { ConfigModule, Global, LogModule, Module } from '@penguin-tech/core';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule, LogModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
