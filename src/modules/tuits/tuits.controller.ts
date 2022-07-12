import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';
import { CreateTuitDto, UpdateTuitDto } from './dto';

@Controller('tuits')
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Get()
  getTuits(@Query() filterQuery): Promise<Tuit[]> {
    const { searchTerm, orderBy } = filterQuery;

    return this.tuitsService.getTuits();
  }

  @Get(':id') //tuits/1
  getTuit(@Param('id') id: number): Promise<Tuit> {
    return this.tuitsService.getTuit(id);
  }

  @Post()
  createTuit(@Body() message: CreateTuitDto): Promise<Tuit> {
    // console.log(message instanceof CreateTuitDto); 
    
    return this.tuitsService.createTuit(message);
  }

  @Patch(':id')
  updateTuit(
    @Param('id') id: number,
    @Body() tuit: UpdateTuitDto,
  ): Promise<Tuit> {
    return this.tuitsService.updateTuit(id, tuit);
  }

  @Delete(':id')
  removeTuit(@Param('id') id: number): Promise<void> {
    return this.tuitsService.removeTuit(id);
  }
}
