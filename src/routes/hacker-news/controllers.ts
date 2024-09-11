import { Request, Response } from "express";
import { HackerNewsScraper } from "../../models/hacker-news-scraper";


export class HackerNewsController {

  constructor(
      private readonly hackerNewsScraper: HackerNewsScraper,
  ) {
  }

  getNews = (req: Request, res: Response) => {
    this.hackerNewsScraper.getNews().then(
        news => res.json(news)
    ).catch(
        error => res.status(500).json({error: error.message})
    );

  }

}