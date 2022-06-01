import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddWorkerComponent } from './dialog-add-worker.component';

describe('DialogAddWorkerComponent', () => {
  let component: DialogAddWorkerComponent;
  let fixture: ComponentFixture<DialogAddWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
