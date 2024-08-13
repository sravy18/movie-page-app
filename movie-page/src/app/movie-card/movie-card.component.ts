import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDetail } from '../home/home.component';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movies!: MovieDetail

  constructor(private router: Router) { }

  viewMovieDetail(movieId: number) {
    this.router.navigate(['/movie-page', movieId]);
  }
}