import { Router } from "express";
import { HackerNewsController } from "./controllers";
import { HackerNewsScraper } from "../../models/hacker-news-scraper";
import { envs } from "../../config/envs";

export class HackerNewsRoutes {
  static get routes(): Router {
    const router = Router();
    const hackerNewsScraper = new HackerNewsScraper(envs.hacker_news_url)
    const controller = new HackerNewsController(hackerNewsScraper);

    router.get('/', controller.getNews);

    return router;
  }
}