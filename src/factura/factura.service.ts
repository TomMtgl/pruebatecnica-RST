import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ActualizarFacturaDto } from './dto/actualizar-factura.dto';
import { ProductoService } from 'src/producto/producto.service';
import { CrearFacturaDto } from './dto/crear-factura.dto';
import { DetalleFactura, Producto, Factura } from '../../generated/prisma/index';
import { CrearProductoDto } from 'src/producto/dto/crear-producto.dto';

@Injectable()
export class FacturaService {
  constructor(private prisma: PrismaService) { }

  async crearFactura(crearFacturaDto: CrearFacturaDto) {
    const { usuarioId, detalles, fecha, fechaFundacion } = crearFacturaDto;

    const usuario = await this.prisma.usuario.findFirst({
      where: { usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    let totalFactura = 0;
    const detallesValidados: Array<{
      prodId: number;
      cantidad: number;
      subtotal: number;
    }> = [];

    for (const detalle of detalles) {
      const producto = await this.prisma.producto.findUnique({ where: { productoId: detalle.productoId } });

      if (!producto) {
        throw new NotFoundException(`Producto con ID ${detalle.productoId} no encontrado`);
      }

      if (!producto.disponible) {
        throw new BadRequestException(`El producto ${producto.nombre} no está disponible`);
      }

      if (producto.stock < detalle.cantidad) {
        throw new BadRequestException(
          `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}`
        );
      }

      const subtotal = detalle.cantidad * producto.precioUnitario;
      totalFactura += subtotal;

      detallesValidados.push({
        prodId: detalle.productoId,
        cantidad: detalle.cantidad,
        subtotal,
      });
    }

    try {
      return await this.prisma.$transaction(async (prisma) => {

        const factura = await prisma.factura.create({
          data: {
            usID: usuarioId,
            nombreFantasia: 'RST',
            fecha: fecha ? new Date() : new Date(),
            fechaFundacion: fechaFundacion || new Date().toISOString(),
            total: totalFactura,
            detallesFactura: {
              create: detallesValidados,
            },
          },
          include: {
            usuario: {
              select: {
                usuarioId: true,
                nombreCompleto: true,
                dni: true,
              },
            },
            detallesFactura: {
              include: {
                producto: true,
              },
            },
          },
        });

        for (const detalle of detallesValidados) {
          await prisma.producto.update({
            where: { productoId: detalle.prodId },
            data: { stock: { decrement: detalle.cantidad } },
          });
        }

        return factura;
      });
    } catch (error) {
      console.error('Error al crear factura:', error);
      throw new BadRequestException('Error al crear la factura');
    }
  }
  async getFacturas() {
    return await this.prisma.factura.findMany({ where: { disponible: true } })
  }
  async getAllFacturas() {
    return await this.prisma.factura.findMany()
  }
  async getFacturaById(facturaId: number) {
    const facturaEncontrada = await this.prisma.factura.findUnique({ where: { facturaId } });
    if (!facturaEncontrada) {
      throw new NotFoundException('No se encontro la factura')
    }
    return facturaEncontrada
  }
  async actualizarFactura(facturaId: number, factura: ActualizarFacturaDto) {
    return await this.prisma.factura.update({ where: { facturaId }, data: factura })
  }
  async eliminarFactura(facturaId: number) {
    return await this.prisma.factura.delete({ where: { facturaId } })
  }
  async bajaLogicaFactura(facturaId: number) {
    return this.prisma.factura.update({
      where: { facturaId },
      data: { disponible: false, }
    });
  }
  async restaurarFactura(facturaId: number) {
    return this.prisma.factura.update({
      where: { facturaId },
      data: { disponible: true, }
    });
  }
}
