import { Product } from 'src/schemas/product.schema';

export class CreateProductDto implements Readonly<Product> {
  name: string;
  description: string;
  price: string;
  currency: string;
}
