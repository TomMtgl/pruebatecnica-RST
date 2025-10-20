import { IsString, IsNumber, IsBoolean, IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class CrearProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @Min(0)
  precioUnitario: number;

  @IsInt()
  @Min(0)
  stock: number;

}