import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { UpdataMovieDto } from './dto/updata-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testing function getAll', () => {
    it('should return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Testing function getOne', () => {
    it('should return movie', () => {
      service.create({
        title: 'Movie 1',
        year: 2021,
        genres: ['Drama', 'Thriller'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie?.id).toEqual(1);
    });

    it('Should return NotFoundException error', () => {
      const id = 111;
      try {
        service.getOne(id);
      } catch (e) {
        const error = e as NotFoundException;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie ${id} not found`);
      }
    });
  });

  describe('Testing function remove', () => {
    it('movie remove', () => {
      service.create({
        title: 'Movie 1',
        year: 2021,
        genres: ['Drama', 'Thriller'],
      });

      const allMovies = service.getAll().length;
      service.remove(1);
      const afterRemove = service.getAll().length;
      expect(afterRemove).toBeLessThan(allMovies);
    });

    it('Should return NotFoundException error', () => {
      const id = 111;
      try {
        service.remove(id);
      } catch (e) {
        const error = e as NotFoundException;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie ${id} not found`);
      }
    });
  });

  describe('Testing function create', () => {
    it('should create movie', () => {
      const movieData = {
        title: 'Movie 1',
        year: 2021,
        genres: ['Drama', 'Thriller'],
      };
      const beforeCreate = service.getAll().length;
      service.create(movieData);
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie?.title).toEqual(movieData.title);
      expect(movie?.year).toEqual(movieData.year);
      expect(movie?.genres).toEqual(movieData.genres);
    });
  });

  describe('Testing function patch', () => {
    it('should update movie', () => {
      service.create({
        title: 'Movie 1',
        year: 2021,
        genres: ['Drama', 'Thriller'],
      });

      const movieBeforeUpdate = service.getOne(1);
      expect(movieBeforeUpdate?.title).toEqual('Movie 1');

      const updateData: UpdataMovieDto = {
        title: 'Updated Movie 1',
      };
      service.patch(1, updateData);

      const movieAfterUpdate = service.getOne(1);
      expect(movieAfterUpdate?.title).toEqual(updateData.title);
      expect(movieAfterUpdate?.year).toEqual(movieBeforeUpdate?.year);
      expect(movieAfterUpdate?.genres).toEqual(movieBeforeUpdate?.genres);
    });

    it('Should return NotFoundException error', () => {
      const id = 111;
      try {
        service.patch(id, { title: '' });
      } catch (e) {
        const error = e as NotFoundException;
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie ${id} not found`);
      }
    });
  });
});
