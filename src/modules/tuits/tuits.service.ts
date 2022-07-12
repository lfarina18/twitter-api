import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
  constructor(@InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>) { }

  async getTuits({limit, offset}: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async getTuit(id: number): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.findOne({
      where: {
        id
      },
      relations: ['user'],
    });

    if (!tuit) {
      throw new NotFoundException(`Tuit with id ${id} not found`);
    }

    return tuit;
  }

  async createTuit({ message }: CreateTuitDto) {
    const tuit: Tuit = this.tuitRepository.create({ message });
    return this.tuitRepository.save(tuit);
  }

  async updateTuit(id: number, { message }: UpdateTuitDto) {
    const tuit: Tuit = await this.tuitRepository.preload({
      id,
      message,
    });
    if (!tuit) {
      throw new NotFoundException(`Tuit with id ${id} not found`);
    }
    return this.tuitRepository.save(tuit);

  }

  async removeTuit(id: number): Promise<void> {
    const tuit: Tuit = await this.tuitRepository.findOneBy({ id });
    if (!tuit) {
      throw new NotFoundException(`Tuit with id ${id} not found`);
    }
    this.tuitRepository.remove(tuit);
  }
}
