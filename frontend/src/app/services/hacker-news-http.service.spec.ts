import { TestBed } from '@angular/core/testing';

import { HackerNewsHttpService } from './hacker-news-http.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";


describe('HackerNewsHttpService', () => {
  let service: HackerNewsHttpService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [HackerNewsHttpService, provideHttpClientTesting()]
    });
    service = TestBed.inject(HackerNewsHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
