import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags(`Offre d'emploi`)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: `Créer UNE offre d'emploi` })
  @Post()
  create(@Body() createClientDto: CreateJobDto) {
    return this.jobsService.create(createClientDto);
  }

  @ApiOperation({ summary: `Récupérer TOUTES les offres d'emplois` })
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @ApiOperation({ summary: `Récupérer UNE offre d'emploi` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @ApiOperation({ summary: `Modifier UNE seule offre d'emploi` })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: `Supprimer UNE seule offre d'emploi` })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
