import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from './movie.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  movieNames: string[] = [];

  constructor(private router: Router, private movieService: MovieService) { }


  ngOnInit(): void {
    // here use comineLatest to ensure that subscription only occour after data fetching
    combineLatest([
      this.movieService.movies$,
      this.movieService.movieNames$,
    ]).subscribe(([movies, names]) => {
      if (movies.length > 0) {
        this.movieNames = names;
      }
    });

    this.movieService.fetchMovies().subscribe();
  }


  onSearchSubmit(searchValue: string): void {
    if (searchValue) {
      const movieId = this.movieService.getMovieIdByName(searchValue);

      if (movieId !== undefined) {
        this.router.navigate(['/movie-page', movieId]);
      } else {
        this.router.navigate(['/'], { queryParams: { search: searchValue } });
      }

    }
  }


  onMovieSelect(selectedMovie: string): void {
    const movieId = this.movieService.getMovieIdByName(selectedMovie);
    if (movieId !== undefined) {
      this.router.navigate(['/movie-page', movieId]);
    }
  }
}