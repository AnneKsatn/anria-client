import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingmentsPageComponent } from './assingments-page.component';

describe('AssingmentsPageComponent', () => {
  let component: AssingmentsPageComponent;
  let fixture: ComponentFixture<AssingmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingmentsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
