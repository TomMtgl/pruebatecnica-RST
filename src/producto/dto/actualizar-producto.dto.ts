import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ActualizarProductoDto {
    @IsString()
    @IsOptional()
    nombre?: string;
  
    @IsString()
    @IsOptional()
    descripcion?: string;
  
    @IsNumber()
    @Min(0)
    @IsOptional()
    precioUnitario?: number;
  
    @IsInt()
    @Min(0)
    @IsOptional()
    stock?: number;
  
    @IsBoolean()
    @IsOptional()
    disponible?: boolean;
  }