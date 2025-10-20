import {  IsInt,  IsPositive,  IsArray,  ValidateNested,  ArrayMinSize, IsOptional, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CrearDetalleFacturaDto } from 'src/detalle-factura/dto/crear-detalle-factura.dto';
  
  export class CrearFacturaDto {
    @IsInt()
    @IsPositive()
    usuarioId: number;
  
    @IsDateString()
    @IsOptional()
    fecha?: string;
  
    @IsString()
    @IsOptional()
    fechaFundacion?: string;
  
    @IsArray()
    @ArrayMinSize(1, { message: 'La factura debe tener al menos un detalle' })
    @ValidateNested({ each: true })
    @Type(() => CrearDetalleFacturaDto)
    detalles: CrearDetalleFacturaDto[];
  }