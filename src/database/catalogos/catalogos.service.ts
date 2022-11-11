import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoDisciplinaPlanDto } from './dto/catalogo-disciplina-plan.dto';
import { CatalogoDisciplinaDto } from './dto/catalogo-disciplina.dto';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';
import { CatalogoDisciplina } from './entities/catalogo-disciplina';
import { CatalogoDisciplinaPlanes } from './entities/catalogo-disciplina-planes';
import { CatalogoAfiliacionMedica } from './entities/catalogo-afiliacion-medica';

@Injectable()
export class CatalogosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(CatalogoDisciplina)
    private catalogoDisciplinaRepository: Repository<CatalogoDisciplina>,
    @InjectRepository(CatalogoDisciplinaPlanes)
    private catalogoDisciplinaPlanesRepository: Repository<CatalogoDisciplinaPlanes>,
    @InjectRepository(CatalogoAfiliacionMedica)
    private afiliacionMedicaRepository: Repository<CatalogoAfiliacionMedica>,
    @InjectRepository(CatalogoDisciplina)
    private disciplinaRepository: Repository<CatalogoDisciplina>,
  ) {}

  create(createCatalogoDto: CreateCatalogoDto) {
    return 'This action adds a new catalogo';
  }
  async agregarDisciplina(catalogoDisciplinaDto: CatalogoDisciplinaDto) {
    try {
      const nuevoCatalogoPlan = this.catalogoDisciplinaRepository.create(
        catalogoDisciplinaDto,
      );
      console.log(nuevoCatalogoPlan);
      await this.catalogoDisciplinaRepository.save(nuevoCatalogoPlan);
      return nuevoCatalogoPlan;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async agregarDisciplinaPlan(
    catalogoDisciplinaPlanDto: CatalogoDisciplinaPlanDto,
  ) {
    // return await catalogoDisciplinaPlanDto;

    try {
      const q = catalogoDisciplinaPlanDto.disciplina;
      const disciplina = await this.catalogoDisciplinaRepository.findOneBy({
        id: q,
      });

      console.log(disciplina);

      const nuevoCatalogoDisciplinaPlan =
        this.catalogoDisciplinaPlanesRepository.create({
          ...catalogoDisciplinaPlanDto,
          disciplina: disciplina,
        });
      console.log(nuevoCatalogoDisciplinaPlan);
      await this.catalogoDisciplinaPlanesRepository.save(
        nuevoCatalogoDisciplinaPlan,
      );
      return nuevoCatalogoDisciplinaPlan;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async listaAfiliacionMedica() {
    return await this.afiliacionMedicaRepository.find();
  }

  async listaDisciplina() {
    return await this.disciplinaRepository.find();
  }

  async listaDisciplinaPlan(id: number) {
    const queryBuilder =
      this.catalogoDisciplinaPlanesRepository.createQueryBuilder('disciplina');
    var disciplina = await queryBuilder
      .where('disciplina.disciplina = :disciplinaid', { disciplinaid: id })
      .getMany();

    return disciplina;
    // return await this.
  }

  findAll() {
    return `This action returns all catalogos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalogo`;
  }

  update(id: number, updateCatalogoDto: UpdateCatalogoDto) {
    return `This action updates a #${id} catalogo`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalogo`;
  }

  private handleDBExceptions(error: any) {
    console.log(error);

    if (error.sqlState === '23000') {
      throw new BadRequestException(error.sqlMessage);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('aiudaaa');
  }
}
