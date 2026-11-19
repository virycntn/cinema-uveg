import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { of } from 'rxjs';
import { AppModule } from '../../app-module';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../services/movie.service';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const mockMovieService = {
    getMovieDetails: () => of({
      id: 238,
      title: 'El padrino',
      overview: 'Historia familiar',
      poster_path: '',
      backdrop_path: '',
      release_date: '1972-03-14',
      vote_average: 8.7,
      vote_count: 19000,
      genres: [{ id: 18, name: 'Drama' }],
      runtime: 175,
      tagline: 'Una oferta que no podrá rechazar',
      status: 'Released',
      original_language: 'en'
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: MovieService, useValue: mockMovieService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load details when movieId changes', () => {
    component.movieId = 238;
    component.ngOnChanges({
      movieId: new SimpleChange(null, 238, true)
    });
    expect(component.movie?.title).toBe('El padrino');
  });
});

