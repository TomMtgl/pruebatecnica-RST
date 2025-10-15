import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { FacturaModule } from './factura/factura.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';


@Module({
  imports: [UsuarioModule, ProductoModule, FacturaModule, DetalleFacturaModule],
})
export class AppModule {}

