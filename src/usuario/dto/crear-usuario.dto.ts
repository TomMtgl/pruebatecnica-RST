import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";


export class crearUsuarioDto {
    @IsNotEmpty()
    @IsString()
    nombreCompleto: string;
    @IsString()
    @IsNotEmpty()
    dni: string;
    @IsString()
    sexo: string;
    @IsBoolean()
    disponible: boolean;
    @IsString()
    estadoCivil: string;
    @IsDateString()
    fechaNacimiento: string;
}