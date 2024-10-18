import {
  Injectable, NotFoundException
} from '@nestjs/common';

export interface Content {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  characters: string[];
}

@Injectable()
export class AppService {
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

  #getContent(id: number) {
    const content = this.#contents.find((m) => m.id === id);

    if(!content) {
      throw new NotFoundException('Invalid content ID :(');
    }

    return content;
  }

  searchAllContents(
    title?: string,
    year?: number,
    genre?: string,
    director?: string,
    character?: string
  ) {
    if (!title && !year && !genre && !director && !character) {
      return this.#contents;
    }

    return this.#contents.filter((m) => {
        return (title && m.title.toLowerCase().includes(title.toLowerCase()))
        || (year && m.year === year)
        || (genre && m.genre.toLowerCase() === genre.toLowerCase())
        || (director && m.director.toLowerCase().includes(director.toLowerCase()))
        || (character && m.characters.some((c) => c.toLowerCase().includes(character.toLowerCase())))
    });
  }

  searchContentById(id: number) {
    return this.#getContent(id);
  }

  uploadContent(
    title: string,
    year: number,
    genre: string,
    director: string,
    characters: string[]
  ) {
    const content: Content = {
      id: this.#nextId++,
      title,
      year,
      genre,
      director,
      characters
    };

    this.#contents.push(content);

    return content;
  }

  updateContent(
    id: number,
    title: string,
    year: number,
    genre: string,
    director: string,
    characters: string[]
  ) {
    const content = this.#getContent(id);

    Object.assign(content, { title, year, genre, director, characters });

    return content;
  }

  deleteContent(id: number) {
    const content = this.#getContent(id);

    this.#contents = this.#contents.filter((m) => m.id !== content.id);
    // this.contents.splice(this.contents.indexOf(content), 1);

    return id;
  }
}
