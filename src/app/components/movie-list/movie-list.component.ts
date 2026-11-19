import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  @Output() movieSelected = new EventEmitter<number>();

  movies: Movie[] = [];
  selectedId: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopRatedMovies();
  }

  loadTopRatedMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las películas. Verifica tu token de TMDB.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  selectMovie(movieId: number): void {
    this.selectedId = movieId;
    this.movieSelected.emit(movieId);
  }

  getPosterUrl(posterPath: string): string {
    return posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : 'https://via.placeholder.com/500x750?text=Sin+Imagen';
  }
}


