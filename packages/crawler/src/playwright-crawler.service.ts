import { Injectable, Scope } from '@penguin-tech/core';
import { PlaywrightCrawlerProcessor } from './internal';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class PlaywrightCrawlerService extends PlaywrightCrawlerProcessor {
  constructor() {
    super(PlaywrightCrawlerService.name, 'playwrightCrawlerService');
  }
}
