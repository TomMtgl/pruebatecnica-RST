import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService]
})
export class UsuarioModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('usuario');
  }
}
