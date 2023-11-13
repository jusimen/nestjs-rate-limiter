import { Product } from 'src/schemas/product.schema';

export class UpdateProductDto implements Readonly<Product> {
  name: string;
  description: string;
  price: string;
  currency: string;
}
