import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AppActions } from './actions';
import { Worker } from '../../core/models/worker'
import { Role } from '../../core/models/role';
import { SystemPage } from '../../core/models/system_page';

export interface IAppState {
    role: Role | null,
    worker: Worker | null,
    pages: SystemPage[]
}

@State<IAppState>({
    name: 'app',
    defaults: {
        role: null,
        worker: null,
        pages: []
    }
})
@Injectable()
export class AppState {
    @Action(AppActions.Initialize)
    initialize(context: StateContext<IAppState>, action: AppActions.Initialize) {
        context.setState(action.state)
    }

    @Selector()
    static worker(state: IAppState) {
        return state.worker;
    }

    @Selector()
    static role(state: IAppState) {
        return state.role;
    }

    @Selector()
    static pages(state: IAppState): SystemPage[]{
        return SystemPage.map(state.pages);
    }

    static getPageByName(name: string) {
        return createSelector([AppState.pages], (pages) => {
            return SystemPage.parse(pages.find(page => page.name === name));
        });
    }
}