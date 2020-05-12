import { LaunchListState } from "./../store/reducers/launch-list.reducer";
import { map } from "rxjs/operators";
import { PastLaunchesListGQL, LaunchDetailsGQL } from "./spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLaunchDetails } from "../store/actions";
import * as launchListQuery from "../store/selectors";
import { LaunchDetailsState } from '../store/reducers/launch-details.reducer';

@Injectable({
  providedIn: "root"
})
export class LaunchDetailsFacadeService {
  launchDetailsState$ = this.store.select(launchListQuery.getLaunchDetailsState);
  launchDetails$ = this.store.select(launchListQuery.getLaunchDetails);
  launchDetailsLoaded$ = this.store.select(launchListQuery.getLaunchDetailsLoaded);
  launchDetailsLoading$ = this.store.select(launchListQuery.getLaunchDetailsLoading);

  constructor(
    private readonly store: Store<LaunchDetailsState>,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  pastLaunchDetailsStoreCache(id: string) {
    this.store.dispatch(loadLaunchDetails({ payload: { id } }));
    return this.launchDetails$;
  }

  pastLaunchDetailsFacade(id: string) {
    return this.launchDetailsService.fetch({ id })
      .pipe(map(res => res.data.launch));
  }
}
