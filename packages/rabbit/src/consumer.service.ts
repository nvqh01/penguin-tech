import { Injectable, Scope } from '@penguin-tech/core';
import { Consumer } from './internal';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ConsumerService<Input = any> extends Consumer<Input> {
  constructor() {
    super(ConsumerService.name, 'consumerService');
  }

  public setConfigKey(configKey: string): void {
    this.configKey = configKey;
  }
}
