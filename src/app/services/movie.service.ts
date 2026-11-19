import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetail, MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly baseUrl = 'https://api.themoviedb.org/3/movie';
  private readonly accessToken = 'PEGA_AQUI_TU_TOKEN';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      accept: 'application/json'
    });
  }

  getTopRatedMovies(page: number = 1): Observable<MovieResponse> {
    const url = `${this.baseUrl}/top_rated?language=es-MX&page=${page}`;
    return this.http.get<MovieResponse>(url, { headers: this.getHeaders() });
  }

  getMovieDetails(movieId: number): Observable<MovieDetail> {
    const url = `${this.baseUrl}/${movieId}?language=es-MX`;
    return this.http.get<MovieDetail>(url, { headers: this.getHeaders() });
  }
}

