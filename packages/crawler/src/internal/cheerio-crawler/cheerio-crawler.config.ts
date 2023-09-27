import { HttpCrawlerConfig } from '../http-crawler';
import { CrawlerConfig } from '../basic-crawler';

export class CheerioCrawlerConfig extends HttpCrawlerConfig {
  constructor(config: CrawlerConfig) {
    super(config);
  }
}
