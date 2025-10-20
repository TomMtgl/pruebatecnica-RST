import { IsInt, IsPositive, Min } from 'class-validator';

export class CrearDetalleFacturaDto {
  @IsInt()
  @IsPositive()
  productoId: number;

  @IsInt()
  @Min(1)
  cantidad: number;
}