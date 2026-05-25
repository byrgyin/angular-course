import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInput } from './post-input';

describe('PostInput', () => {
  let component: PostInput;
  let fixture: ComponentFixture<PostInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
