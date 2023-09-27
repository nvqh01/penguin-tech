import { ConfigModule, LogModule, Global, Module } from '@penguin-tech/core';
import { ProxyManagerService } from './proxy-manager.service';

@Global()
@Module({
  imports: [ConfigModule, LogModule],
  providers: [ProxyManagerService],
  exports: [ProxyManagerService],
})
export class ProxyManagerModule {}
