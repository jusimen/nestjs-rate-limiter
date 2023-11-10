import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from 'src/routes/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './products.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
})
export class ProductsModule {}
