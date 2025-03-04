import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdataMovieDto extends PartialType(CreateMovieDto) {}
