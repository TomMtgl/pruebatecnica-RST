import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { crearUsuarioDto } from 'src/usuario/dto/crear-usuario.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import request from 'supertest';
import { AuthGuard } from './guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor (private authService: AuthService){}
    @Post('register')
    register(@Body()crearUsuarioDto: crearUsuarioDto){
        return this.authService.register(crearUsuarioDto)
    }
    @Post('login')
    login(@Body()loginDto: loginDto){
        return this.authService.login(loginDto)
    }
}
