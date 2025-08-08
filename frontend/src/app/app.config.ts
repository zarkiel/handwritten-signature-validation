import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { RequestInterceptor } from './core/middlewares/request.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { provideAnimations } from '@angular/platform-browser/animations';

import Theme from '@primeng/themes/lara';

import { providePrimeNG } from 'primeng/config';
import { ErrorInterceptor } from './core/middlewares/error.interceptor';
import { provideStore } from '@ngxs/store';
import { AppState } from './state/app/state';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        ConfirmationService,
        DialogService,
        MessageService,
        provideStore([AppState]),
        providePrimeNG({
            theme: {
                preset: Theme,
                options: {
                    prefix: 'p',
                    darkModeSelector: false,//'system',
                    cssLayer: false
                }
            }
        })
    ]
};

import { ModuleRegistry } from 'ag-grid-community'; 
import { AllEnterpriseModule } from 'ag-grid-enterprise';
 
// Register all Community and Enterprise features
ModuleRegistry.registerModules([AllEnterpriseModule]);