import axios from 'axios';
import { HackerNewsScraper } from "../src/models/hacker-news-scraper";
import { HackerNewsHtmlMock } from "./mocks/hacker-news-html-mock";


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HackerNewsScraper', () => {
  let scraper: HackerNewsScraper;

  beforeEach(() => {
    scraper = new HackerNewsScraper('https://news.ycombinator.com/');
  });

  it('Should throw error if fetch fails', async () => {
    mockedAxios.get.mockRejectedValue('');
    await expect(scraper.fetchHtml()).rejects.toThrow('Error fetching HTML');
  });

  it('should return a string when fetch is succesfull', async () => {
    const htmlMock = HackerNewsHtmlMock;

    mockedAxios.get.mockResolvedValue({data: htmlMock});

    await expect(scraper.fetchHtml()).resolves.toBe(htmlMock);

  });

});
