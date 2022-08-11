import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingmentIngoPageComponent } from './assingment-ingo-page.component';

describe('AssingmentIngoPageComponent', () => {
  let component: AssingmentIngoPageComponent;
  let fixture: ComponentFixture<AssingmentIngoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingmentIngoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingmentIngoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
