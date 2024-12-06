import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SpectaclesComponent } from './views/spectacles/spectacles.component';
import { EditSpectaclesComponent } from './views/edit-spectacles/edit-spectacles.component';
import { ArtistsComponent } from './views/artists/artists.component';
import { EditArtistsComponent } from './views/edit-artists/edit-artists.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'spectacles', component: SpectaclesComponent },
    { path: 'edit-spectacle/:id', component: EditSpectaclesComponent },
    { path: 'artists', component: ArtistsComponent },
    { path: 'edit-artist/:id', component: EditArtistsComponent },
];
