import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTableComponent } from './news-table.component';
import { HackerNewsHttpService } from "../../services/hacker-news-http.service";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";

describe('NewsTableComponent', () => {
  let component: NewsTableComponent;
  let fixture: ComponentFixture<NewsTableComponent>;
  let service: HackerNewsHttpService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsTableComponent,HttpClientTestingModule],
      providers: [HackerNewsHttpService, provideHttpClientTesting()]
    })
    .compileComponents();

    service = TestBed.inject(HackerNewsHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(NewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
