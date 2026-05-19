import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth';
import {catchError, switchMap, throwError} from 'rxjs';


let isRefresh = false as boolean;

export const authTokenInterceptor: HttpInterceptorFn = (req,next) =>{
  const authService = inject(AuthService);
  const token = authService.token;

  if(!token) return next(req);

  if(isRefresh){
    return refersAndProceed(authService, req, next);
  }


  return next(addToken(req,token))
    .pipe(
      catchError(error=>{
        if(error.status === 403){
          return refersAndProceed(authService, req, next);
        }
        return throwError(error);
      })
    )
}

const refersAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
)=>{

  if(!isRefresh){
    isRefresh = true;

    return authService.refreshAuthToken()
      .pipe(
        switchMap(res=>{

          isRefresh = false;

          return next(addToken(req,res.access_token));
        })
      )
  }
  return next(addToken(req,authService.token!));

}

const addToken = (req:HttpRequest<any>,token:string)=>{
  return req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
