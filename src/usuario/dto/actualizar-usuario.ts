import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString, MinLength } from "class-validator";

export class actualizarUsuarioDto {
    @IsNotEmpty()
    @IsString()
    nombreCompleto?: string;
    @IsString()
    @Transform(({ value })=> value.trim())
    @MinLength(6)
    contraseña?: string;
    @IsString()
    @IsNotEmpty()
    dni?: string;
    @IsString()
    sexo?: string;
    @IsString()
    estadoCivil?: string;
    @IsDateString()
    fechaNacimiento?: string;
}