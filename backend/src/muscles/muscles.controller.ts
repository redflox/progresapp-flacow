import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MusclesService } from './muscles.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Auth(['admin'])
@Controller('muscles')
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @Post()
  create(@Body() createMuscleDto: CreateMuscleDto) {
    return this.musclesService.create(createMuscleDto);
  }

  @Get()
  @Auth(['user','admin'])
  findAll() {
    return this.musclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.musclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMuscleDto: UpdateMuscleDto) {
    return this.musclesService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.musclesService.remove(id);
  }
}
