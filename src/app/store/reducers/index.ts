import { ActionReducerMap } from "@ngrx/store";
import * as fromLaunchList from "./launch-list.reducer";
import * as fromLaunchDetails from "./launch-details.reducer";

export interface AppState {
  launchList: fromLaunchList.LaunchListState;
  launchDetails: fromLaunchDetails.LaunchDetailsState;
}

export const launchReducers: ActionReducerMap<AppState, any> = {
  launchList: fromLaunchList.reducer,
  launchDetails: fromLaunchDetails.reducer
};
