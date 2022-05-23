import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoPageComponent } from './task-info-page.component';

describe('TaskInfoPageComponent', () => {
  let component: TaskInfoPageComponent;
  let fixture: ComponentFixture<TaskInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
