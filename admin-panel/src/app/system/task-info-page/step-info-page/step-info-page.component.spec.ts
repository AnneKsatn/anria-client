import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInfoPageComponent } from './step-info-page.component';

describe('StepInfoPageComponent', () => {
  let component: StepInfoPageComponent;
  let fixture: ComponentFixture<StepInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
