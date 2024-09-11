import axios from 'axios';
import { HackerNewsScraper } from "../src/models/hacker-news-scraper";
import { HACKER_NEWS_HTML } from "./mocks/hacker-news-html";
import { HACKER_NEWS_RESULT } from "./mocks/hacker-news-result";
import { HackerNews } from "../src/models/hacker-news";


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HackerNewsScraper', () => {
  let scraper: HackerNewsScraper;

  beforeEach(() => {
    scraper = new HackerNewsScraper('https://news.ycombinator.com/');
  });

  xit('Should throw error if fetch fails', async () => {
    mockedAxios.get.mockRejectedValue('');

    await expect(scraper.fetchHtml()).rejects.toThrow('Error fetching HTML');
  });

  xit('should return a string when fetch is succesfull', async () => {
    const htmlMock = HACKER_NEWS_HTML;

    mockedAxios.get.mockResolvedValue({data: htmlMock});

    await expect(scraper.fetchHtml()).resolves.toBe(htmlMock);

  });

  xit('should get news array from html', async () => {
    mockedAxios.get.mockResolvedValue({data: HACKER_NEWS_HTML});

    const result = HACKER_NEWS_RESULT.map(item => {
      return new HackerNews(item);
    })

    const news = await scraper.getNews();

    expect(news).toStrictEqual(result);
  });


  xit('should return empty array when no news found', async () => {

    mockedAxios.get.mockResolvedValue({data: `<html lang="en" op="news"><head><title>Hacker News</title></head><body><table> <tbody> </tbody></table>  </body></html>`});

    const news = await scraper.getNews();

    expect(news.length).toBe(0);
  })

});
