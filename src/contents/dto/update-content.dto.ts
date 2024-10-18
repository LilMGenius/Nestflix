import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './create-content.dto';

export class UpdateContentDto extends PartialType(CreateContentDto) {
    title?: string;
    year?: number;
    genre?: string;
    director?: string;
    characters?: string[] | string;
}
