import { ConfigModule, Global, LogModule, Module } from '@penguin-tech/core';
import { Adapter } from './internal';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Global()
@Module({
  imports: [ConfigModule, LogModule],
  providers: [Adapter, ConsumerService, ProducerService],
  exports: [Adapter, ConsumerService, ProducerService],
})
export class RabbitModule {}
