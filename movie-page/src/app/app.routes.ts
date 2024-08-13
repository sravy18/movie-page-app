import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'; import { MoviePageComponent } from './movie-page/movie-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movie-page/:id', component: MoviePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }