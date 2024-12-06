import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SpectaclesComponent } from './views/spectacles/spectacles.component';
import { EditSpectaclesComponent } from './views/edit-spectacles/edit-spectacles.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'spectacles', component: SpectaclesComponent },
    { path: 'edit-spectacle/:id', component: EditSpectaclesComponent }
];
