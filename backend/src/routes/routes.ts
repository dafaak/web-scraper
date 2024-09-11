import { Router } from "express";
import { HackerNewsRoutes } from "./hacker-news/routes"

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/hacker-news', HackerNewsRoutes.routes);

    return router;
  }
}