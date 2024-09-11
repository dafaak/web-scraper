import { decodeHtmlEntities } from "../utils/decode-he";

export class HackerNews {
  title: string;
  number: number;
  points: number = 0;
  numberOfComments: number = 0;

  constructor(params: {
    title: string,
    number: number,
    points: number,
    numberOfComments?: number
  }, decodeHtmlEntitiesFunction: (htmlString: string) => string = decodeHtmlEntities) {

    const {title, number, points, numberOfComments} = params;

    if (!title) throw new Error('Title required!');
    const decodedTitle = decodeHtmlEntitiesFunction(title);
    this.title = decodedTitle.replace(/[^a-zA-Z0-9\s]/g, '');

    if (!number) throw new Error('Number required!');
    this.number = number;

    if (points) this.points = points;

    if (numberOfComments) this.numberOfComments = numberOfComments;

  }


}