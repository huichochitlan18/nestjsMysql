import { IsBoolean, IsIn, IsNumber, IsOptional, IsPositive, isString, IsString, MinLength } from "class-validator";

export class UsuarioInformacionContactoDto {

    @IsString()
    @MinLength(1)
    numeroCelular: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    numeroCasa:string

    @IsString()
    @MinLength(1)
    cp:string;

    @IsString()
    estado:string;

    @IsString()
    municipio:string;

    @IsString()
    colonia:string;

    @IsString()
    calle:string;

    @IsString()
    numero:string;
   
}
