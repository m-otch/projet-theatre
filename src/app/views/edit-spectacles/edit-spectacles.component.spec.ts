import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpectaclesComponent } from './edit-spectacles.component';

describe('EditSpectaclesComponent', () => {
  let component: EditSpectaclesComponent;
  let fixture: ComponentFixture<EditSpectaclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpectaclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpectaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
