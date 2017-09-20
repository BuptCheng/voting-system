import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InverseAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authenService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (!authenticated) {
          return true;
        } else {
          this.router.navigate(['/user-dashboard']);
          // TODO: give information say "You are ready signed in!"
        }
      }
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}