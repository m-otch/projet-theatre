import { Component, OnInit } from '@angular/core';
import { Artists, ArtistWithSpectacle } from '../../models/artists.model';
import { ArtistsService } from '../../services/artists.service';
import { SpectaclesService } from '../../services/spectacles.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit {
  artists: Artists[] = [];
  form!: FormGroup;
  spectaclesArtist: ArtistWithSpectacle[] = [];

  constructor(private artistsService: ArtistsService, private formBuilder: FormBuilder, private spectaclesService: SpectaclesService) {}

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe((data: Artists[]) => {
      this.artists = data;
    });
    this.form = this.formBuilder.group({
      type: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      biography: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });

    this.spectaclesService.getArtistWithSpectacle().subscribe((data) => {
      this.spectaclesArtist = data;
    });
  }

  onSubmit() {
    const formData = this.form.value;
    if (!formData.type || !formData.firstname || !formData.lastname || !formData.biography || !formData.email || !formData.phone) {
      console.log("Certains champs obligatoires sont vides, soumission annulée.");
    }else {
    this.artistsService.addArtists(formData).subscribe();
    console.log(formData);
    }
  }

  deleteArtists(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet artiste ?')) {
      this.artistsService.deleteArtists(id).subscribe(() => {
        this.artists = this.artists.filter(artist => artist.id != id);
      });
    }
  }

}
