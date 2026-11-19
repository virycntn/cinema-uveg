import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cinema UVEG';
  selectedMovieId: number | null = null;

  onSelectMovie(movieId: number): void {
    this.selectedMovieId = movieId;
  }

  onClearSelection(): void {
    this.selectedMovieId = null;
  }
}

