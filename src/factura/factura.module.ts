import { Module } from '@nestjs/common';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';
import { ProductoModule } from 'src/producto/producto.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ProductoModule],
  controllers: [FacturaController],
  providers: [FacturaService, PrismaService]
})
export class FacturaModule {}
