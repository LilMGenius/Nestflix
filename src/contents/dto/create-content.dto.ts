export class CreateContentDto {
    title: string;
    year: number;
    genre: string;
    director: string;
    characters: string[] | string;
}
