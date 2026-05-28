import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth';
import {BehaviorSubject, catchError, filter, switchMap, tap, throwError} from 'rxjs';


let isRefresh$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req,next) =>{
  const authService = inject(AuthService);
  const token = authService.token;

  if(!token) return next(req);

  if(isRefresh$.value){
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

  if(!isRefresh$.value){
    isRefresh$.next(true);

    return authService.refreshAuthToken()
      .pipe(
        switchMap(res=>{
          return next(addToken(req,res.access_token))
            .pipe(
              tap(()=>{
                isRefresh$.next(false);
              })
            );
        })
      );
  }

  if(req.url.includes('refresh'))return next(addToken(req,authService.token!))

  return isRefresh$.pipe(
    filter(isRefresh$=> !isRefresh$),
    switchMap(res =>{
      return next(addToken(req,authService.token!));
    })
  );
}

const addToken = (req:HttpRequest<any>,token:string)=>{
  return req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
