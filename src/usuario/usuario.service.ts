import { Injectable, NotFoundException } from '@nestjs/common';
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import { actualizarUsuarioDto } from './dto/actualizar-usuario';
import { PrismaService } from 'src/prisma.service';
import { using } from 'rxjs';
import { Usuario } from '../../generated/prisma/index';



@Injectable()
export class UsuarioService {

    constructor(private prisma : PrismaService){}

    async getUsuarios(){
        return this.prisma.usuario.findMany({where: {disponible: true,}});
    }
    async getAllUsuarios(){
        return this.prisma.usuario.findMany()
    }

    async getUsuarioByDni(dni: string) {
        const usuarioEncontrado = this.prisma.usuario.findFirst({where: {dni, disponible: true}})

        return usuarioEncontrado
    }

    async getUsuarioPorId(usuarioId: number){
        const usuarioEncontrado = await this.prisma.usuario.findFirst({
            where: { usuarioId: usuarioId, disponible: true },
            include: {
              facturas: {
                where: { disponible: true },
                include: {
                  detallesFactura: {
                    include: {
                      producto: true,
                    },
                  },
                },
              },
            },
          });

        if (!usuarioEncontrado){
            return new NotFoundException(`Usuario con id ${usuarioId} no encontrado`)
        }

        return usuarioEncontrado
    }

    async crearUsuario(usuario: crearUsuarioDto){
        return await this.prisma.usuario.create({data: usuario});
    }
    async actualizarUsuario(usuarioId: number, usuario: actualizarUsuarioDto){
        return this.prisma.usuario.update({where: {usuarioId}, data: usuario})
    }   
    async eliminarUsuario(usuarioId: number){
        return this.prisma.usuario.delete({where: {usuarioId}});
    }   
    async bajaLogicaUsuario(usuarioId: number){
            return this.prisma.usuario.update({
                where: {usuarioId},
                data:{ disponible: false,}});
    }
    async restaurarUsuario(usuarioId: number){
        return this.prisma.usuario.update({
            where: {usuarioId},
            data:{ disponible: true,}});
    }
}
