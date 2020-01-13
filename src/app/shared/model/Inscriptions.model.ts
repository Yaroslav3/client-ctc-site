export class Inscriptions {
  id: number;
  paragraph: string;
  description: string;


  constructor(paragraph: string, description: string) {
    this.paragraph = paragraph;
    this.description = description;
  }
}
