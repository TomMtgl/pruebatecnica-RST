import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsString, MinLength } from "class-validator";


export class loginDto {
    @IsString()
    @Transform(({ value })=> value.trim())
    @MinLength(6)
    contraseña: string;
    @IsString()
    @IsNotEmpty()
    dni: string;
}