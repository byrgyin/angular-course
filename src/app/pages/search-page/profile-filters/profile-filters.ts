import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileService} from '../../../data/sevices/profile.service';
import {debounceTime, startWith, Subscription, switchMap} from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss',
})
export class ProfileFilters implements OnDestroy{
  fb = inject(FormBuilder);
  profileService = inject(ProfileService)


  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  searchFormSub!: Subscription;

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.searchFormSub.unsubscribe();
  }
}
