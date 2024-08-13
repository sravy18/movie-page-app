import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent implements OnInit {

  movie$!: Observable<MovieDetail | undefined>;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (movieId) {
      this.movie$ = this.movieService.getMovieById(Number(movieId));
    }
  }

  updateRating(movie: MovieDetail, ratingInput: HTMLInputElement): void {
    this.movieService.updateMovieRating(movie.id, movie.rating);
    ratingInput.value = '';
  }


}