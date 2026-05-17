import {inject} from '@angular/core';
import {AuthService} from './auth';
import {Router} from '@angular/router';

export const canActiveAuth = ()=>{
  const isLoggedIn = inject(AuthService).isAuth;

  if(isLoggedIn){
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
}
