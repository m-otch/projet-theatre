import { Component, OnInit } from '@angular/core';
import { Spectacles } from '../../models/spectacles.model';
import { SpectaclesService } from '../../services/spectacles.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArtistWithSpectacle } from '../../models/artists.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spectacles',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './spectacles.component.html',
  styleUrl: './spectacles.component.css'
})
export class SpectaclesComponent implements OnInit {
  spectacles: Spectacles[] = [];
  form!: FormGroup;
  spectaclesArtist: ArtistWithSpectacle[] = [];

  constructor(private spectaclesService: SpectaclesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.spectaclesService.getSpectacles().subscribe((data: Spectacles[]) => {
      this.spectacles = data;
    });
    
    this.form = this.formBuilder.group({
      date: [null, Validators.required],
      name: [null, Validators.required],
      duration: [null, Validators.required],
      description: [null, Validators.required],
      status: [null, Validators.required],
      type: [null, Validators.required],
      capacity: [null, Validators.required],
      hour: [null, Validators.required],
    });

    this.spectaclesService.getArtistWithSpectacle().subscribe((data) => {
      this.spectaclesArtist = data;  // Liez les résultats de l'API à la variable
    });
  }
  
  onSubmit() {
    const formData = this.form.value;
    this.spectaclesService.addSpectacles(formData).subscribe()
    console.log(this.spectaclesService); // { email: "valeur saisie", password: "valeur saisie" }
  }

  deleteSpectacle(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce spectacle ?')) {
      this.spectaclesService.deleteSpectacle(id).subscribe(() => {
        this.spectacles = this.spectacles.filter(spectacle => spectacle.id !== id);
      });
    }
  }
}
