import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcryptjs from 'bcryptjs';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ){}
    
    async register(registerDto: registerDto){
        const usuario = await this.usuarioService.getUsuarioByDni(registerDto.dni)

        if(usuario){
            throw new BadRequestException('Usuario ya existe')
        }
        return this.usuarioService.crearUsuario({...registerDto, contraseña: await bcryptjs.hash(registerDto.contraseña, 10)})

    }
    async login({contraseña, dni}: loginDto){
        const usuario = await this.usuarioService.getUsuarioByDni(dni)

        if(!usuario){
            throw new NotFoundException('No se contro el DNI')
        }
        const contraseñaValida = await bcryptjs.compare(contraseña, usuario.contraseña) 
        if(!contraseñaValida){
            throw new UnauthorizedException('Contraseña incorrecta')
        }

        const payload = {dni: usuario.dni}

        const token = await this.jwtService.signAsync(payload)

        return {token, usuario:{Id: usuario.usuarioId, nombre: usuario.nombreCompleto}}
    }

}
