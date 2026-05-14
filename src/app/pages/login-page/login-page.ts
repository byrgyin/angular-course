import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null),
  })
  onSubmit(event:Event){
    console.log(event.target)
  }
}
