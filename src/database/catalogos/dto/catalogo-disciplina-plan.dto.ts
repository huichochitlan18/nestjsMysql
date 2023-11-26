import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CatalogoDisciplinaPlanDto {
    @IsString()
    @MinLength(1)    
    plan: string;  

    @IsNumber()
    @IsPositive()
    precio:number;

    @IsNumber()
    @IsPositive()
    @Type((type) => Number)
    disciplina:number;
}
