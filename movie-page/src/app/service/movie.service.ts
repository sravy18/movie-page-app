import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { MovieDetail } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesSubject = new BehaviorSubject<MovieDetail[]>([]);
  movies$ = this.moviesSubject.asObservable();

  private movieNamesSubject = new BehaviorSubject<string[]>([]);
  movieNames$ = this.movieNamesSubject.asObservable();

  private movieApiUrl = "https://dummyapi.online/api/movies";

  constructor(private http: HttpClient) { }


  // Fetch all movies data and update the centralized store
  fetchMovies(): Observable<MovieDetail[]> {
    return this.http.get<MovieDetail[]>(this.movieApiUrl).pipe(
      tap(movies => {
        this.moviesSubject.next(movies);
        this.movieNamesSubject.next(movies.map(movie => movie.movie));
      }),
      catchError(err => {
        console.error('Error fetching movies', err);
        return of([]);
      })
    );
  }


  // Get a movie by ID from the centralized store
  getMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.movieApiUrl}/${id}`);
  }



  // Update movie rating and reflect it in the centralized store
  updateMovieRating(id: number, newRating: number): void {
    const currentMovies = this.moviesSubject.getValue();
    const updatedMovies = currentMovies.map(movie =>
      movie.id === id ? { ...movie, rating: newRating } : movie
    );
    this.moviesSubject.next(updatedMovies);
  }


  // Get a movie ID by its name
  getMovieIdByName(movieName: string): number | undefined {
    const currentMovies = this.moviesSubject.getValue();
    const movie = currentMovies.find(m => m.movie.toLowerCase() === movieName.toLowerCase());
    return movie?.id;
  }

}