import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMainComponent } from './validation-main.component';

describe('ValidationMainComponent', () => {
  let component: ValidationMainComponent;
  let fixture: ComponentFixture<ValidationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
