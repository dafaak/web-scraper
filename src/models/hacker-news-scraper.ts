import axios from "axios";

export class HackerNewsScraper {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

   async fetchHtml(): Promise<string> {
    try {
      const {data} = await axios.get(this.url);

      return data as string;

    } catch (e) {
      throw new Error('Error fetching HTML');
    }
  }
}