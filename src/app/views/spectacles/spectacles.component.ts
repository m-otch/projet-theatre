import { Component, OnInit } from '@angular/core';
import { Spectacles } from '../../models/spectacles.model';
import { SpectaclesService } from '../../services/spectacles.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-spectacles',
  imports: [],
  templateUrl: './spectacles.component.html',
  styleUrl: './spectacles.component.css'
})
export class SpectaclesComponent implements OnInit {
  spectacles: Spectacles[] = [];
  form: FormGroup;

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
    })
  }
}
