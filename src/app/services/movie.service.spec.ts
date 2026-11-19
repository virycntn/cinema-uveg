import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top rated movies', () => {
    const mockResponse = {
      page: 1,
      results: [{ id: 278, title: 'Cadena perpetua', overview: '', poster_path: '', backdrop_path: '', release_date: '1994-09-23', vote_average: 8.7, vote_count: 25000 }],
      total_pages: 1,
      total_results: 1
    };

    service.getTopRatedMovies().subscribe((res) => {
      expect(res.results.length).toBe(1);
      expect(res.results[0].title).toBe('Cadena perpetua');
    });

    const req = httpMock.expectOne('https://api.themoviedb.org/3/movie/top_rated?language=es-MX&page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

