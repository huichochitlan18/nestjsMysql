import { IsString, MinLength } from "class-validator";

export class CatalogoDisciplinaDto {
    @IsString()
    @MinLength(1)    
    disciplina: string;  
}
