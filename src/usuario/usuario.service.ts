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

    async getUsuarioPorId(usuarioId: number){
        const usuarioEcontrado = this.prisma.usuario.findUnique({where: {usuarioId}});

        if (!usuarioEcontrado){
            return new NotFoundException(`Usuario con id ${usuarioId} no encontrado`)
        }

        return usuarioEcontrado
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
}
