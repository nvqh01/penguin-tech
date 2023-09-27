import { Injectable } from '@penguin-tech/core';
import { ResolverConfig } from './resolver.config';
import { Stream } from '../stream';

@Injectable()
export abstract class Resolver<Input = any, Output = any> extends Stream<
  Input,
  Output
> {
  constructor(context: string, configKey: string) {
    super(context, configKey);
  }

  protected getConfig(): ResolverConfig {
    return (
      this.config ||
      (this.config = new ResolverConfig(
        this.configService.get<ResolverConfig>(this.configKey),
      ))
    );
  }
}
