import { Router } from "express";
import { HackerNewsController } from "./controllers";

export class HackerNewsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new HackerNewsController();

    router.get('/', controller.getNews);

    return router;
  }
}