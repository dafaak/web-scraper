import 'dotenv/config'
import env from "env-var"

export const envs = {
  port: env.get('PORT').required(true).asPortNumber(),
  hacker_news_url: env.get('HACKER_NEWS_URL').required(true).asString(),
}