import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { HackerNewsHttpService } from "./services/hacker-news-http.service";

describe('AppComponent', () => {
  let service: HackerNewsHttpService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,HttpClientTestingModule],
      providers: [HackerNewsHttpService, provideHttpClientTesting()]
    }).compileComponents();

    service = TestBed.inject(HackerNewsHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('HACKER NEWS WEB SCRAPER');
  });
});
