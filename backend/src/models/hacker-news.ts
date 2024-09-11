export class HackerNews {
  title: string;
  number: number;
  points: number;
  numberOfComments: number = 0;

  constructor(params: { title: string, number: number, points: number, numberOfComments?: number }) {

    const {title, number, points, numberOfComments} = params;

    if (!title) throw new Error('Title required!');
    this.title = title;

    if (!number) throw new Error('Number required!');
    this.number = number;

    if (!points) throw new Error('Points required!');
    this.points = points;

    if (numberOfComments) this.numberOfComments = numberOfComments;

  }


}