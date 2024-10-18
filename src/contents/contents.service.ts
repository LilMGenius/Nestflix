import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentsService {
  #nextId = 3;

  #contents: Content[] = [
    {
      id: 1,
      title: 'Ip Man',
      year: 2008,
      genre: 'Action',
      director: 'Wilson Yip',
      characters: ['Donnie Yen', 'Simon Yam', 'Lynn Hung']
    },
    {
      id: 2,
      title: 'Ong-Bak: Muay Thai Warrior',
      year: 2003,
      genre: 'Action',
      director: 'Prachya Pinkaew',
      characters: ['Tony Jaa', 'Petchtai Wongkamlao', 'Pumwaree Yodkamol']
    },
  ];

  #get(id: number) {
    const content = this.#contents.find((m) => m.id === id);

    if(!content) {
      throw new NotFoundException('Invalid content ID :(');
    }

    return content;
  }

  create(createContentDto: CreateContentDto) {
    const content: Content = {
      id: this.#nextId++,
      ...createContentDto,
    };

    this.#contents.push(content);

    return content;
  }

  findAll(updateContentDto: UpdateContentDto) {
    if (!updateContentDto.title && !updateContentDto.year && !updateContentDto.genre && !updateContentDto.director && !updateContentDto.characters) {
      return this.#contents;
    }

    return this.#contents.filter((m) => {
        if (typeof m.characters === 'string') {
            m.characters = [m.characters];
        }

        if (typeof updateContentDto.characters === 'string') {
            updateContentDto.characters = [updateContentDto.characters];
        }

        return (updateContentDto.title && m.title.toLowerCase().includes(updateContentDto.title.toLowerCase()))
        || (updateContentDto.year && m.year === updateContentDto.year)
        || (updateContentDto.genre && m.genre.toLowerCase() === updateContentDto.genre.toLowerCase())
        || (updateContentDto.director && m.director.toLowerCase().includes(updateContentDto.director.toLowerCase()))
        || (updateContentDto.characters && updateContentDto.characters.some((c) => m.characters.includes(c)));
    });
  }

  findById(id: number) {
    return this.#get(id);
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    const content = this.#get(id);

    Object.assign(content, updateContentDto);

    return content;
  }

  remove(id: number) {
    const content = this.#get(id);

    this.#contents = this.#contents.filter((m) => m.id !== content.id);
    // this.contents.splice(this.contents.indexOf(content), 1);

    return id;
  }
}
