import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridOptionsButtonComponent } from './aggrid-options-button.component';

describe('AggridOptionsButtonComponent', () => {
  let component: AggridOptionsButtonComponent;
  let fixture: ComponentFixture<AggridOptionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggridOptionsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggridOptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
