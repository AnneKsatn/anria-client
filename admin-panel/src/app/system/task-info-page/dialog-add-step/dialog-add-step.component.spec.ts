import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStepComponent } from './dialog-add-step.component';

describe('DialogAddStepComponent', () => {
  let component: DialogAddStepComponent;
  let fixture: ComponentFixture<DialogAddStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
