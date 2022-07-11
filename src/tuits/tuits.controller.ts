import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
    constructor(private readonly tuitsService: TuitsService) {}
    

    @Get()
    getTuits(@Query() filterQuery): Tuit[] {
        const { searchTerm, orderBy } = filterQuery;

        return this.tuitsService.getTuits();
    }

    @Get(':id') //tuits/1
    getTuit(@Param('id') id: string): Tuit {
        return this.tuitsService.getTuit(id);
    }

    @Post()
    createTuit(@Body('message') message: string): void {
        return this.tuitsService.createTuit(message);
    }

    @Patch(':id')
    updateTuit(@Param('id') id: string, @Body('message') tuit): Tuit {
        return this.tuitsService.updateTuit(id, tuit);
    }

    @Delete(':id')
    removeTuit(@Param('id') id: string): void {
        return this.tuitsService.removeTuit(id);
    }

}
