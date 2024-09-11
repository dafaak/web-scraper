import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { HackerNewsHttpService } from "../../services/hacker-news-http.service";
import { HackerNewsInterface } from "../../models/hacker-news.interface";
import { map } from "rxjs";
import { Button } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: 'app-news-table',
  standalone: true,
  imports: [TableModule, CommonModule, Button, TooltipModule],
  templateUrl: './news-table.component.html',
  styleUrl: './news-table.component.css'
})
export class NewsTableComponent implements OnInit {
  news!: HackerNewsInterface[];

  cols!: { field: string, header: string }[];
  private hackernewsHttpService = inject(HackerNewsHttpService);

  hackerNews$ = this.hackernewsHttpService.getHackerNews();


  ngOnInit() {
    this.cols = [
      {field: 'title', header: 'Title'},
      {field: 'number', header: 'Rank'},
      {field: 'points', header: 'Points'},
      {field: 'numberOfComments', header: 'Comments'}
    ];


  }

  filterByNumberOfComments() {
    this.getNews();
    if (this.hackerNews$)
      this.hackerNews$ = this.hackerNews$.pipe(
        map(news => {
          const newsFilterByTitle = news.filter(item => item.title.split(' ').length >= 5);
          return newsFilterByTitle.sort((a, b) => b.numberOfComments - a.numberOfComments);
        })
      )
  }


  filterByPoints() {
    this.getNews();
    if (this.hackerNews$)
      this.hackerNews$ = this.hackerNews$.pipe(
        map(news => {
          const newsFilterByTitle = news.filter(item => item.title.split(' ').length <= 5);
          return newsFilterByTitle.sort((a, b) => b.points - a.points);
        })
      )
  }


  getNews() {
    this.hackerNews$ = this.hackernewsHttpService.getHackerNews();
  }

}
