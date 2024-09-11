import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTableComponent } from './news-table.component';
import { HackerNewsHttpService } from "../../services/hacker-news-http.service";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { HackerNewsInterface } from "../../models/hacker-news.interface";
import { of } from "rxjs";

describe('NewsTableComponent', () => {
  let component: NewsTableComponent;
  let fixture: ComponentFixture<NewsTableComponent>;
  let service: HackerNewsHttpService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsTableComponent, HttpClientTestingModule],
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

  it('should filter and sort news by number of comments and length of title  greater than 5', () => {
    const mockNews: HackerNewsInterface[] = [
      {title: 'Short title ', numberOfComments: 10, number: 1, points: 12},
      {title: 'This is a much longer title with many words', numberOfComments: 5, number: 1, points: 12},
      {title: 'Another longer title with a lot of words', numberOfComments: 15, number: 1, points: 12}
    ];
    spyOn(service, 'getHackerNews').and.callFake(() => of(mockNews));

    component.filterByNumberOfComments();

    expect(component.hackerNews$).toBeTruthy();
    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(2);
      expect(filteredNews[0].numberOfComments).toBe(15);
      expect(filteredNews[1].numberOfComments).toBe(5);
    });
  });

  it('should return an empty array when no news match the filter by comments', () => {
    const mockNews: HackerNewsInterface[] = [
      {title: 'short title ', numberOfComments: 10, number: 1, points: 12},
      {title: 'short', numberOfComments: 5, number: 1, points: 12},
      {title: 'title', numberOfComments: 15, number: 1, points: 12}
    ];
    spyOn(service, 'getHackerNews').and.callFake(() => of(mockNews));

    component.filterByNumberOfComments();

    expect(component.hackerNews$).toBeTruthy();
    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(0);
    });
  })

  it('should filter and sort news by points and length of title  less than 5', () => {
    const mockNews: HackerNewsInterface[] = [
      {title: 'Short title ', numberOfComments: 10, number: 1, points: 12},
      {title: 'This is a much longer title with many words', numberOfComments: 5, number: 1, points: 12},
      {title: 'Another longer title with a lot of words', numberOfComments: 15, number: 1, points: 12}
    ];
    spyOn(service, 'getHackerNews').and.callFake(() => of(mockNews));

    component.filterByPoints();

    expect(component.hackerNews$).toBeTruthy();
    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(1);
      expect(filteredNews[0].points).toBe(12);
    });
  });


  it('should return an empty array when no news match the filter by points', () => {
    const mockNews: HackerNewsInterface[] = [
      {title: 'this is a longer title than before ', numberOfComments: 10, number: 1, points: 12},
      {title: 'This is a much longer title with many words', numberOfComments: 5, number: 1, points: 12},
      {title: 'Another longer title with a lot of words', numberOfComments: 15, number: 1, points: 12}
    ];
    spyOn(service, 'getHackerNews').and.callFake(() => of(mockNews));

    component.filterByPoints();

    expect(component.hackerNews$).toBeTruthy();
    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(0);
    });
  })

  it('should return an empty array when no news found', () => {

    spyOn(service, 'getHackerNews').and.callFake(() => of([]));
    component.filterByPoints();
    expect(component.hackerNews$).toBeTruthy();
    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(0);
    });

    component.filterByNumberOfComments();
    expect(component.hackerNews$).toBeTruthy();
    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(0);
    });
  })

  it('should handle undefined hackerNews$', () => {
    spyOn(service, 'getHackerNews').and.callFake(() => undefined);

    component.filterByNumberOfComments();

    expect(component.hackerNews$).toBeFalsy();
    component.filterByPoints();
    expect(component.hackerNews$).toBeFalsy();
  });

  it('should handle news with empty titles', () => {
    const mockNews = [
      {title: '', numberOfComments: 10, number: 1, points: 12},
      {title: 'Another longer title with a lot of words', numberOfComments: 15, number: 1, points: 12}
    ];
    spyOn(service, 'getHackerNews').and.callFake(() => of(mockNews));

    component.filterByNumberOfComments();

    component.hackerNews$?.subscribe(filteredNews => {
      expect(filteredNews.length).toBe(1);
      expect(filteredNews[0].title).toBe('Another longer title with a lot of words');
    });
  });

});


