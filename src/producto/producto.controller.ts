import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('producto')
@ApiTags('Producto')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ProductoController {
    constructor(private productoService: ProductoService) {}

    @Get()
    getUsuarios(@Query() query: any){
        return this.productoService.getProductos();
    }
    @Get('todos')
    getAllUsuarios(@Query() query: any){
        return this.productoService.getAllProductos();
    }

    @Get('/:id')
    getUsuarioPorId(@Param('id') id: string) {
        return this.productoService.getProductoById(Number(id));
    }

    @Post()
    crearUsuario(@Body() producto: CrearProductoDto) {
        return this.productoService.crearProducto(producto);
    }   
    @Put('/:id')
    actualizarUsuario(@Param('id') id: string , @Body() producto: ActualizarProductoDto) {
        try{
            return this.productoService.actualizarProducto(Number(id), producto)
        }catch{
            throw new NotFoundException('No existe el usuario')
        }
    }   
    @Delete('/:id/permanente')
    eliminarUsuario(@Param('id')id: string){
        try{
            return this.productoService.eliminarProducto(Number(id))
        }catch{
            throw new NotFoundException('No existe el producto')
        }
    }

    @Delete('/:id')
    bajaLogicaUsuario(@Param('id')productoId: string){
        try{
            return this.productoService.bajaLogicaProducto(Number(productoId))
        }catch{
            throw new NotFoundException('No existe el producto')
        }
    }
    @Patch('/:id')
    @ApiOperation({summary: 'Habilitar producto'})
    restaurarProducto(@Param('id')productoId: string){
        try{
            return this.productoService.restaurarProducto(Number(productoId))
        }catch{
            throw new NotFoundException('No existe el producto')
        }
    }
}
