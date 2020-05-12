import { createAction, props } from "@ngrx/store";

export const loadLaunchDetails = createAction(
  "[Launch Details] Load Launch Details",
  props<{ payload: { id: string } }>()
);

export const loadLaunchDetailsSuccess = createAction(
  "[Launch Details] Load Launch Details Success",
  props<{ payload: Object }>()
);

export const loadLaunchDetailsFail = createAction(
  "[Launch Details] Load Launch Details Fail",
  props<{ payload: Object }>()
);

export type LaunchDetailsAction =
  | typeof loadLaunchDetails
  | typeof loadLaunchDetailsSuccess
  | typeof loadLaunchDetailsFail;
