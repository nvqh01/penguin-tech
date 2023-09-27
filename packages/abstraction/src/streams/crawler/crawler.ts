import { Injectable } from '@penguin-tech/core';
import {
  BasicCrawlingContext,
  BasicCrawlerProcessor,
} from '@penguin-tech/crawler';
import { CrawlerConfig } from './crawler.config';
import { Stream } from '../stream';

@Injectable()
export abstract class Crawler<Input = any, Output = any> extends Stream<
  Input,
  Output
> {
  constructor(
    context: string,
    configKey: string,
    protected crawler: BasicCrawlerProcessor<BasicCrawlingContext>,
  ) {
    super(context, configKey);
  }

  protected getConfig(): CrawlerConfig {
    return (
      this.config ||
      (this.config = new CrawlerConfig(
        this.configService.get<CrawlerConfig>(this.configKey),
      ))
    );
  }
}
