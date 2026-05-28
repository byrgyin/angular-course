import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFilters } from './profile-filters';

describe('ProfileFilters', () => {
  let component: ProfileFilters;
  let fixture: ComponentFixture<ProfileFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
