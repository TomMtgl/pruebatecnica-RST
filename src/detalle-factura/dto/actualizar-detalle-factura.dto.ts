import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class ActualizarDetalleFacturaDto{
  @IsInt()
  @IsPositive()
  @IsOptional()
  productoId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @IsNotEmpty()
  cantidad?: number;
}