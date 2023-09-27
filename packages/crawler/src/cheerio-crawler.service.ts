import { Injectable, Scope } from '@penguin-tech/core';
import { CheerioCrawlerProcessor } from './internal';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class CheerioCrawlerService extends CheerioCrawlerProcessor {
  constructor() {
    super(CheerioCrawlerService.name, 'cheerioCrawlerService');
  }
}
