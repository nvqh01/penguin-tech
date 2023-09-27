import { Global, Module } from '@penguin-tech/core';
import { CrawlerModule } from '@penguin-tech/crawler';
import { MongoModule } from '@penguin-tech/mongo';
import { ProxyManagerModule } from '@penguin-tech/proxy-manager';
import { RabbitModule } from '@penguin-tech/rabbit';
import { RedisModule } from '@penguin-tech/redis';

@Global()
@Module({
  imports: [
    CrawlerModule,
    MongoModule,
    ProxyManagerModule,
    RabbitModule,
    RedisModule,
  ],
  providers: [],
  exports: [],
})
export class AbstractionModule {}
