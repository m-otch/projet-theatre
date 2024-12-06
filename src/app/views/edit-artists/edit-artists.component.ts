import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtistsService } from '../../services/artists.service';
import { Artists } from '../../models/artists.model';

@Component({
  selector: 'app-edit-artists',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-artists.component.html',
  styleUrl: './edit-artists.component.css'
})
export class EditArtistsComponent implements OnInit {
  form!: FormGroup;
  artistId!: string;

  constructor(
    private artistService: ArtistsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id')!;
      this.loadArtist();
    });

    this.form = this.formBuilder.group({
      type: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      biography: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });
  }
  

  loadArtist(): void {
    this.artistService.getArtistsById(this.artistId).subscribe((data: Artists) => {
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedArtist: Artists = this.form.value;
      this.artistService.updateArtists(this.artistId, updatedArtist).subscribe(() => {
        this.router.navigate(['/artists']);
      });
    } else {
      console.log('Formulaire invalide');
      
    }
  }
}
