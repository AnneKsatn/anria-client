import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPhotoComponent } from './step-photo.component';

describe('StepPhotoComponent', () => {
  let component: StepPhotoComponent;
  let fixture: ComponentFixture<StepPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
