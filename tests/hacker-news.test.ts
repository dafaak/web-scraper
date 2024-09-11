import { HackerNews } from "../src/models/hacker-news";
import { HacekerNewsInterface } from "../src/routes/hacker-news/interfaces/haceker-news.interface";

describe('Hacker news', () => {

  it('should create HackerNews the with correct values', () => {
    const hackerNewsToCreate: HacekerNewsInterface = {
      title: 'title',
      number: 1,
      points: 400,
      numberOfComments: 345
    }

    const hackerNews = new HackerNews(hackerNewsToCreate);

    expect(hackerNews.title).toBe(hackerNewsToCreate.title);
    expect(hackerNews.number).toBe(hackerNewsToCreate.number);
    expect(hackerNews.points).toBe(hackerNewsToCreate.points);
    expect(hackerNews.numberOfComments).toBe(hackerNewsToCreate.numberOfComments);
  });

  it('should set numberOfComments to 0 if not provided', () => {
    const hackerNews = new HackerNews({title: 'Title', number: 1, points: 1});
    expect(hackerNews.numberOfComments).toBe(0);
  })


  it('should throw error if title not found ', () => {
    expect(() => new HackerNews({
      title: '',
      number: 1,
      numberOfComments: 1,
      points: 2
    })).toThrow(Error('Title required!'));
  });

  it('should throw error if number not found ', () => {
    expect(() => new HackerNews({
      title: 'Title',
      number: NaN,
      numberOfComments: 1,
      points: 2
    })).toThrow(Error('Number required!'));
  })


  it('should throw error if points not found ', () => {
    expect(() => new HackerNews({
      title: 'Title',
      number: 1,
      numberOfComments: 1,
      points: NaN
    })).toThrow(Error('Points required!'));
  })

});