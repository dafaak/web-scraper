import axios from 'axios';
import { HackerNewsScraper } from "../src/models/hacker-news-scraper";

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

});
