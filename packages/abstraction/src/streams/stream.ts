import {
  ConfigService,
  LogService,
  Inject,
  Injectable,
  OnModuleInit,
} from '@penguin-tech/core';
import {
  ConsumeMessage,
  ConsumerService,
  ProducerService,
} from '@penguin-tech/rabbit';
import { RedisService } from '@penguin-tech/redis';
import { StreamConfig } from './stream.config';

@Injectable()
export abstract class Stream<Input = any, Output = any>
  implements OnModuleInit
{
  @Inject()
  protected readonly configService: ConfigService;

  @Inject()
  protected readonly consumer: ConsumerService<Input>;

  @Inject()
  protected readonly logger: LogService;

  @Inject()
  protected readonly producer: ProducerService<Output>;

  @Inject()
  protected readonly redis: RedisService;

  protected config: StreamConfig;

  constructor(
    protected context: string,
    protected configKey: string,
  ) {}

  public async onModuleInit(): Promise<void> {
    if (!this.getConfig().enable) return;
    this.logger.setContext(this.context);
    await this._init();
    this._start();
  }

  protected abstract init(): Promise<void> | void;

  protected async _init(): Promise<void> {
    await this.init();

    this.getConfig().useConsumer &&
      this.consumer.addMessageHandler(
        async (input, msg) => await this.messageHandler(input, msg),
      );
  }

  protected async _start(): Promise<void> {
    await Promise.all([
      this.startConsumers(),
      this.startProducers(),
      this.start(),
    ]);
  }

  protected getConfig(): StreamConfig {
    return (
      this.config ||
      (this.config = new StreamConfig(
        this.configService.get<StreamConfig>(this.configKey),
      ))
    );
  }

  protected async getValidOutput(
    output: Output[],
    createKeyInCacheFn: (output: Output) => string,
  ): Promise<Output[]> {
    if (!this.getConfig().cache.enable) return output;

    const validOutput: Output[] = [];
    for (const _output of output) {
      const key = createKeyInCacheFn(_output);
      const isExisted = await this.redis.get(key);

      if (isExisted) continue;

      await this.redis.set(key, true, this.getConfig().cache.ttl);
      validOutput.push(_output);
    }

    return output;
  }

  protected async messageHandler(
    input: Input,
    msg: ConsumeMessage,
  ): Promise<void> {
    // Implement this method when to use consumer provider.
  }

  protected async start(): Promise<void> {
    // Implement this method when to use providers like crawler provider,... except consumer provider and producer provider.
  }

  protected async startConsumers(): Promise<void> {
    if (!this.getConfig().useConsumer) return;
    await this.consumer.start();
  }

  protected async startProducers(): Promise<void> {
    if (!this.getConfig().useProducer) return;
    await this.producer.start();
  }
}
