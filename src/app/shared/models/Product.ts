export class Product {

  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public imageUrl: string;

  constructor(id: number, name: string, description: string, price: number, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
