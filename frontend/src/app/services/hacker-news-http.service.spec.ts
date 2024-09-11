import { TestBed } from '@angular/core/testing';

import { HackerNewsHttpService } from './hacker-news-http.service';

describe('HackerNewsHttpService', () => {
  let service: HackerNewsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerNewsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
