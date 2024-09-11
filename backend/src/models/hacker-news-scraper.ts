import axios from "axios";
import { HackerNews } from "./hacker-news";
import { HacekerNewsInterface } from "../routes/hacker-news/interfaces/haceker-news.interface";

export class HackerNewsScraper {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  private async fetchHtml(): Promise<string> {
    try {
      const {data} = await axios.get(this.url);

      return data as string;

    } catch (e) {
      throw new Error('Error fetching HTML');
    }
  }

  private extractNews(html: string): HackerNews[] {
    const news: HackerNews[] = [];

    const items = html.split(`class='athing'`);

    items.slice(1, 31).forEach(item => {

      const HackerNewsToCreate = this.extractNewsDataFromString(item);

      const newsItem = new HackerNews({
        ...HackerNewsToCreate
      })

      news.push(newsItem);

    });

    return news;
  };


  private extractNewsDataFromString(string: string): HacekerNewsInterface {

    const regexTitle = /<span class="titleline"><a[^>]*>(.*?)<\/a>/g;
    const regexPoints = /<span class="score" id="score_[^>]*>(\d+) points<\/span>/g;
    const regexNumber = /<span class="rank">(\d+).<\/span>/g;
    const regexComments = /<a[^>]*>(\d+)+&nbsp;comments<\/a>/g;

    const titleMatch = this.getRegexMatch(string, regexTitle);
    const pointsMatch = this.getRegexMatch(string, regexPoints);
    const numberMatch = this.getRegexMatch(string, regexNumber);
    const commentsMatch = this.getRegexMatch(string, regexComments);

    const hackerNews: HacekerNewsInterface = {
      title: titleMatch,
      number: +numberMatch,
      points: +pointsMatch
    }

    if (commentsMatch) hackerNews['numberOfComments'] = +commentsMatch;

    return hackerNews;
  }

  private getRegexMatch(string: string, regex: RegExp): string {
    const match = [...string.matchAll(regex)].map(m => m[1])
    return match[0];
  }

  async getNews(): Promise<HackerNews[]> {
    const html = await this.fetchHtml();
    return this.extractNews(html);
  }
}