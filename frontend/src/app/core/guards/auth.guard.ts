import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { of, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppActions } from '../../state/app/actions';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated = authService.isLoggedIn();
    const sessionService = inject(SessionService);
    const store = inject(Store);
    
    if(!isAuthenticated()){
        router.navigate(["/login"]);
        return false;
    }

    return sessionService.getInitialState().pipe(
        switchMap((res) => {
            store.dispatch(new AppActions.Initialize(res.data));
            return of(true)
        })
    );
};


export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated = authService.isLoggedIn();
    if(isAuthenticated()){
        router.navigate(["/"]);

    }

    return !isAuthenticated();
};