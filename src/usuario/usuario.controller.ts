import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { crearUsuarioDto } from './dto/crear-usuario.dto';
import { actualizarUsuarioDto } from './dto/actualizar-usuario';
import { Usuario } from '../../generated/prisma/index';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('usuario')
@ApiTags('Usuario')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UsuarioController {


    constructor(private usuarioService: UsuarioService) {}

    @Get()
    getUsuarios(@Query() query: any){
        return this.usuarioService.getUsuarios();
    }
    @Get('todos')
    getAllUsuarios(@Query() query: any){
        return this.usuarioService.getAllUsuarios();
    }

    @Get('/:id')
    getUsuarioPorId(@Param('id') id: string) {
        return this.usuarioService.getUsuarioPorId(Number(id));
    }

    @Post()
    crearUsuario(@Body() usuario: crearUsuarioDto) {
        return this.usuarioService.crearUsuario(usuario);
    }   
    @Put('/:id')
    actualizarUsuario(@Param('id') id: string , @Body() usuario: actualizarUsuarioDto) {
        try{
            return this.usuarioService.actualizarUsuario(Number(id), usuario)
        }catch{
            throw new NotFoundException('No existe el usuario')
        }
    }   
    @Delete('/:id/permanente')
    eliminarUsuario(@Param('id')id: string){
        try{
            return this.usuarioService.eliminarUsuario(Number(id))
        }catch{
            throw new NotFoundException('No existe el usuario')
        }
    }

    @Delete('/:id')
    bajaLogicaUsuario(@Param('id')id: string){
        try{
            return this.usuarioService.bajaLogicaUsuario(Number(id))
        }catch{
            throw new NotFoundException('No existe el usuario')
        }
    }
    @Patch('/:id')
    @ApiOperation({summary: 'Habilitar usuario'})
    restaurarUsuario(@Param('id')id: string){
        try{
            return this.usuarioService.restaurarUsuario(Number(id))
        }catch{
            throw new NotFoundException('No existe el usuario')
        }
    }
}
