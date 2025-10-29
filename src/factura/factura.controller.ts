import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CrearFacturaDto } from './dto/crear-factura.dto';
import { ActualizarFacturaDto } from './dto/actualizar-factura.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ActualizarDetalleFacturaDto } from 'src/detalle-factura/dto/actualizar-detalle-factura.dto';

@Controller('factura')
@ApiTags('Factura')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FacturaController {
    constructor(private facturaService: FacturaService){}

    @Get()
    getFacturas(@Query() query: any){
        return this.facturaService.getFacturas();
    }
    @Get('todos')
    getAllFacturas(@Query() query: any){
        return this.facturaService.getAllFacturas();
    }

    @Get('/:id')
    getFacturaPorId(@Param('id') id: string) {
        return this.facturaService.getFacturaById(Number(id));
    }

    @Post()
    crearFactura(@Body() factura: CrearFacturaDto) {
        return this.facturaService.crearFactura(factura);
    }   
    @Put('/:id')
    actualizarFactura(@Param('id') id: string , @Body() factura: ActualizarFacturaDto) {
        try{
            return this.facturaService.actualizarFactura(Number(id), factura)
        }catch{
            throw new NotFoundException('No existe el usuario')
        }
    }
    @Patch(':facturaId/detalles/:detalleId')
    @ApiOperation({ summary: 'Actualizar cantidad de un detalle' })
    actualizarDetalle(
      @Param('facturaId', ParseIntPipe) facturaId: number,
      @Param('detalleId', ParseIntPipe) detalleFacturaId: number,
      @Body() actualizarDetalleFacturaDto: ActualizarDetalleFacturaDto,
    ) {
      if (actualizarDetalleFacturaDto.cantidad === undefined) {
        throw new BadRequestException('La cantidad es requerida');
      }
    
      return this.facturaService.actualizarDetalleFactura(
        facturaId,
        detalleFacturaId,
        actualizarDetalleFacturaDto.cantidad,
      );
    } 
    @Delete('/:id/permanente')
    eliminarFactura(@Param('id')id: string){
        try{
            return this.facturaService.eliminarFactura(Number(id))
        }catch{
            throw new NotFoundException('No existe el producto')
        }
    }

    @Delete('/:id')
    bajaLogicaUsuario(@Param('id')productoId: string){
        try{
            return this.facturaService.bajaLogicaFactura(Number(productoId))
        }catch{
            throw new NotFoundException('No existe el producto')
        }
    }
    @Patch('/:id')
    @ApiOperation({summary: 'Habilitar factura'})
    restaurarFactura(@Param('id')productoId: string){
        try{
            return this.facturaService.restaurarFactura(Number(productoId))
        }catch{
            throw new NotFoundException('No existe el producto')
        }
    }
}
