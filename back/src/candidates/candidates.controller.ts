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
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Candidats')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @ApiOperation({ summary: 'Créer UN candidat' })
  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }

  @ApiOperation({ summary: 'Récupérer TOUS les candidats' })
  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer UN seul candidat' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Modifier UN seul candidat' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidatesService.update(+id, updateCandidateDto);
  }

  @ApiOperation({ summary: 'Supprimer UN seul candidat' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }
}
