import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignmentComponent } from './dialog-assignment.component';

describe('DialogAssignmentComponent', () => {
  let component: DialogAssignmentComponent;
  let fixture: ComponentFixture<DialogAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
