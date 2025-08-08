import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCategoryComponent } from './nav-category.component';

describe('NavCategoryComponent', () => {
  let component: NavCategoryComponent;
  let fixture: ComponentFixture<NavCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
