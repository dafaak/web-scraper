import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { HackerNewsInterface } from "../models/hacker-news.interface";
import { catchError, Observable, of, shareReplay } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HackerNewsHttpService {

  private httpClient = inject(HttpClient);
  private mainUrl = environment.BACKEND_URL;
  private hackerNewsUrl = this.mainUrl + 'hacker-news';

  hackerNews$: Observable<any> | undefined = undefined;

  getHackerNews(): Observable<HackerNewsInterface[]> | undefined {
    if (!this.hackerNews$) {
      this.hackerNews$ = this.httpClient.get(this.hackerNewsUrl)
        .pipe(
          shareReplay(1),
          catchError(error => {
            this.hackerNews$ = undefined;
            return of(error);
          })
        );
    }
    return this.hackerNews$;
  }

}
