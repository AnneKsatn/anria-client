import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepPageComponent } from './add-step-page.component';

describe('AddStepPageComponent', () => {
  let component: AddStepPageComponent;
  let fixture: ComponentFixture<AddStepPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStepPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStepPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
