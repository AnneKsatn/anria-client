import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerInfoPageComponent } from './worker-info-page.component';

describe('WorkerInfoPageComponent', () => {
  let component: WorkerInfoPageComponent;
  let fixture: ComponentFixture<WorkerInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
