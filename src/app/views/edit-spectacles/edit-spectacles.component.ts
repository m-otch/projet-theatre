import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SpectaclesService } from '../../services/spectacles.service';
import { Spectacles } from '../../models/spectacles.model';

@Component({
  selector: 'app-edit-spectacle',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-spectacles.component.html',
  styleUrls: ['./edit-spectacles.component.css']
})
export class EditSpectaclesComponent implements OnInit {
  form!: FormGroup;
  spectacleId!: number;

  constructor(
    private spectaclesService: SpectaclesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du spectacle à partir de l'URL
    this.route.paramMap.subscribe((params) => {
      this.spectacleId = +params.get('id')!;
      this.loadSpectacle();
    });

    // Initialisation du formulaire
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
  }

  // Charger les données du spectacle
  loadSpectacle(): void {
    this.spectaclesService.getSpectacleById(this.spectacleId).subscribe((data: Spectacles) => {
      this.form.patchValue(data); // Remplir le formulaire avec les données du spectacle
    });
  }

  // Soumettre le formulaire pour mettre à jour le spectacle
  onSubmit(): void {
    if (this.form.valid) {
      const updatedSpectacle: Spectacles = this.form.value;

      this.spectaclesService.updateSpectacles(this.spectacleId, updatedSpectacle).subscribe(
        (response) => {
          console.log('Spectacle mis à jour avec succès:', response);
          this.router.navigate(['/spectacles']); // Rediriger vers la liste des spectacles après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du spectacle:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
}
