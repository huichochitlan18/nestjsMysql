import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogosService } from './catalogos.service';
import { CatalogoDisciplinaPlanDto } from './dto/catalogo-disciplina-plan.dto';
import { CatalogoDisciplinaDto } from './dto/catalogo-disciplina.dto';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';

@Controller('catalogos')
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) {}

  @Post()
  create(@Body() createCatalogoDto: CreateCatalogoDto) {
    return this.catalogosService.create(createCatalogoDto);
  }

  @Post('disciplina')
  agregarDisciplina(@Body() catalogoDisciplinaDto: CatalogoDisciplinaDto) {
    return this.catalogosService.agregarDisciplina(catalogoDisciplinaDto);
  }

  @Get('disciplina')
  listaDisciplina() {
    return this.catalogosService.listaDisciplina();
  }
  
  @Post('disciplina-plan')
  agregarDisciplinaPlan(@Body() catalogoDisciplinaPlanDto: CatalogoDisciplinaPlanDto) {
    return this.catalogosService.agregarDisciplinaPlan(catalogoDisciplinaPlanDto);
  }

  @Get('afiliacion-medica')
  listaAfiliacionMedica() {
    return this.catalogosService.listaAfiliacionMedica();
  }

  @Get('plan/:id')
  listaDisciplinaPlan(@Param('id') id: string) {
    return this.catalogosService.listaDisciplinaPlan(+id);
  }
  
  @Get()
  findAll() {
    return this.catalogosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogoDto: UpdateCatalogoDto) {
    return this.catalogosService.update(+id, updateCatalogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogosService.remove(+id);
  }
}
