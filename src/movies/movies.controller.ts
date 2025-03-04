import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  // Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdataMovieDto } from './dto/updata-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchInYear: string) {
  //   return `Search movies created after year: ${searchInYear}`;
  // }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    console.log('typeof', typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.remove(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdataMovieDto) {
    return this.moviesService.patch(movieId, updateData);
  }
}
