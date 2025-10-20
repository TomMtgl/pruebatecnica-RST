import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CrearProductoDto } from '../producto/dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Injectable()
export class ProductoService {
    constructor(private prisma: PrismaService) { }

    async getProductos() {
        return await this.prisma.producto.findMany({ where: { disponible: true, } });
    }
    async getAllProductos() {
        return await this.prisma.producto.findMany();
    }
    async getProductoById(productoId: number) {
        const productoEncontrado = await this.prisma.producto.findUnique({where: {productoId}});
        if (!productoEncontrado) {
            throw new NotFoundException('No se encontro el producto')
        }
        return productoEncontrado
    }
    async crearProducto(producto: CrearProductoDto) {
        try {
            return await this.prisma.producto.create({data: producto })
        } catch (error) {
            throw new BadRequestException('Error al crear el producto')
        }
        
    }
    async actualizarProducto(productoId: number, producto: ActualizarProductoDto) {
        return this.prisma.producto.update({ where: { productoId }, data: producto })
    }
    async eliminarProducto(productoId: number) {
        return this.prisma.producto.delete({ where: { productoId } });
    }
    async bajaLogicaProducto(productoId: number) {
        return this.prisma.producto.update({
            where: { productoId },
            data: { disponible: false, }
        });
    }
    async restaurarProducto(productoId: number){
        return this.prisma.producto.update({
            where: { productoId },
            data: { disponible: true, }
        });
    }
    async verificarStock(productoId: number , cantidad: number) {
        const producto = await this.prisma.producto.findUnique({where: {productoId}});

        if (!producto) {
            throw new NotFoundException(`Producto con ID ${productoId} no encontrado`);
          }
    
        if (producto.stock < cantidad) {
          throw new BadRequestException(
            `Stock insuficiente. Disponible: ${producto.stock}, Solicitado: ${cantidad}`
          );
        }  
        return true;
      }
}
