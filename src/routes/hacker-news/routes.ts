import { Router } from "express";
import { HackerNewsController } from "./controllers";
import { HackerNewsScraper } from "../../models/hacker-news-scraper";

export class HackerNewsRoutes {
  static get routes(): Router {
    const router = Router();
    const hackerNewsScraper = new HackerNewsScraper('https://news.ycombinator.coms/')
    const controller = new HackerNewsController(hackerNewsScraper);

    router.get('/', controller.getNews);

    return router;
  }
}