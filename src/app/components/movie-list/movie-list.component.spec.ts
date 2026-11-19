import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from '../../app-module';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  const mockMovieService = {
    getTopRatedMovies: () => of({
      page: 1,
      results: [
        { id: 238, title: 'El padrino', overview: 'Drama', poster_path: '', backdrop_path: '', release_date: '1972-03-14', vote_average: 8.7, vote_count: 19000 }
      ],
      total_pages: 1,
      total_results: 1
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: MovieService, useValue: mockMovieService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load top rated movies', () => {
    expect(component).toBeTruthy();
    expect(component.movies.length).toBe(1);
  });

  it('should emit movieSelected event when a movie is clicked', () => {
    let selectedId: number | undefined;
    component.movieSelected.subscribe((id) => {
      selectedId = id;
    });
    component.selectMovie(238);
    expect(selectedId).toBe(238);
  });
});

