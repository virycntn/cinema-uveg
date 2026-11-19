import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MovieDetail } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnChanges {
  @Input() movieId: number | null = null;
  @Output() closeDetail = new EventEmitter<void>();

  movie: MovieDetail | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieId']) {
      if (this.movieId !== null) {
        this.loadMovieDetail(this.movieId);
      } else {
        this.movie = null;
      }
    }
  }

  loadMovieDetail(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No se pudo obtener el detalle de la película seleccionada.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onClose(): void {
    this.movie = null;
    this.closeDetail.emit();
  }

  getImageUrl(path: string): string {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'https://via.placeholder.com/500x280?text=Sin+Imagen';
  }
}

