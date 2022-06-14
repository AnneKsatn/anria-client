import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkerPageComponent } from './add-worker-page.component';

describe('AddWorkerPageComponent', () => {
  let component: AddWorkerPageComponent;
  let fixture: ComponentFixture<AddWorkerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
