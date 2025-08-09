import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { WorkersListComponent } from './pages/workers/workers-list/workers-list.component';
import { Error404PageComponent } from './common/components/error-404-page/error-404-page.component';
import { select } from '@ngxs/store';
import { AppState } from './state/app/state';

import { UnderConstructionComponent } from './pages/maintenance/under-construction/under-construction.component';

import { WorkersFormComponent } from './pages/workers/workers-form/workers-form.component';
import { DictionariesListComponent } from './pages/dictionaries/dictionaries-list/dictionaries-list.component';
import { CustomersFormComponent } from './pages/customers/customers-form/customers-form.component';
import { CustomersListComponent } from './pages/customers/customers-list/customers-list.component';
import { ValidationMainComponent } from './pages/validation/validation-main/validation-main.component';


export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [isAuthenticatedGuard],
        //pathMatch: "full",
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "validation"
            },
           
            {
                path: "administrative",
                children: [
                    {
                        path: "workers",
                        component: WorkersListComponent,
                        pathMatch: "full"
                    },
                    {
                        path: "workers/form",
                        component: WorkersFormComponent,
                        pathMatch: "full"
                    },
                    {
                        path: "workers/form/:id",
                        component: WorkersFormComponent,
                        pathMatch: "full"
                    },
                    {
                        path: "customers",
                        component: CustomersListComponent,
                        pathMatch: "full"
                    },
                    {
                        path: "customers/form",
                        component: CustomersFormComponent,
                        pathMatch: "full"
                    },
                    {
                        path: "customers/form/:id",
                        component: CustomersFormComponent,
                        pathMatch: "full"
                    }
                ]
            },
            {
                path: "validation",
                component: ValidationMainComponent,
                pathMatch: "full"
            }
        ],
        
    },
    {
        path: "login",
        pathMatch: "full",
        component: LoginComponent,
        canActivate: [isNotAuthenticatedGuard]
    },
    {
        path: '**', 
        component: Error404PageComponent
    }
]

