import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaDropdownComponent } from './mega-dropdown.component';

describe('MegaDropdownComponent', () => {
  let component: MegaDropdownComponent;
  let fixture: ComponentFixture<MegaDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
