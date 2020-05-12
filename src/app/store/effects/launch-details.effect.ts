import { PastLaunchesListGQL, LaunchDetailsGQL } from "./../../services/spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadLaunchDetails,
  loadLaunchDetailsSuccess,
  loadLaunchDetailsFail
} from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class LaunchDetailsEffects {
  constructor(
    private actions$: Actions,
    private readonly pastLaunchesService: PastLaunchesListGQL,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) { }

  loadLaunchDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLaunchDetails),
      switchMap(({ payload }: { payload: { id: string } }) =>
          this.launchDetailsService.fetch(payload)
            .pipe(
              map(
                (response: any) =>
                  loadLaunchDetailsSuccess({
                    payload: response.data.launch as any
                  })
              ),
              catchError(error => of(loadLaunchDetailsFail(error)))
            )
      )
    )
  );
}
