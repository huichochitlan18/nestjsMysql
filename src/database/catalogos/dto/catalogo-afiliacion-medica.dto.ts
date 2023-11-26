import { IsString, MinLength } from "class-validator";

export class CatalogoAfiliacionMedicaDto {
    @IsString()
    @MinLength(1)    
    afiliacionMedica?: string;  
}
