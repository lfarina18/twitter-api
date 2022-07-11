import { Injectable, NotFoundException } from '@nestjs/common';
import { Tuit } from './tuit.entity';
import { CreateTuitDto, UpdateTuitDto } from './dto';

@Injectable()
export class TuitsService {
  private tuits: Tuit[] = [
    {
      id: '1',
      message: 'Hello World from Nest.js!',
    },
  ];

  getTuits(): Tuit[] {
    return this.tuits;
  }

  getTuit(id: string): Tuit {
    const tuit = this.tuits.find((tuit) => tuit.id === id);

    if (!tuit) {
      throw new NotFoundException(`Tuit with id ${id} not found`);
    }

    return tuit;
  }

  createTuit({ message }: CreateTuitDto) {
    this.tuits.push({
      id: (Math.floor(Math.random() * 2000) + 1).toString(),
      message,
    });
  }

  updateTuit(id: string, { message }: UpdateTuitDto) {
    const tuit = this.getTuit(id);
    tuit.message = message;
    return tuit;
  }

  removeTuit(id: string) {
    const index = this.tuits.findIndex((tuit) => tuit.id === id);
    if (index >= 0) {
      this.tuits.splice(index, 1);
    }
  }
}
