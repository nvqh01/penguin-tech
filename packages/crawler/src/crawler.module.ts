import { ConfigModule, Global, LogModule, Module } from '@penguin-tech/core';
import { ProxyManagerModule } from '@penguin-tech/proxy-manager';
import { CheerioCrawlerService } from './cheerio-crawler.service';
import { JSDOMCrawlerService } from './jsdom-crawler.service';
import { PlaywrightCrawlerService } from './playwright-crawler.service';
import { PuppeteerCrawlerService } from './puppeteer-crawler.service';

@Global()
@Module({
  imports: [ConfigModule, LogModule, ProxyManagerModule],
  providers: [
    CheerioCrawlerService,
    JSDOMCrawlerService,
    PlaywrightCrawlerService,
    PuppeteerCrawlerService,
  ],
  exports: [
    CheerioCrawlerService,
    JSDOMCrawlerService,
    PlaywrightCrawlerService,
    PuppeteerCrawlerService,
  ],
})
export class CrawlerModule {}
