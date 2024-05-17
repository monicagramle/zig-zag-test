import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BreedService } from './breed.service';
import { getBreedDetails, getBreedDetailsFailure, getBreedDetailsSuccess, getBreedList, getBreedListFailure, getBreedListSuccess } from './breed.actions';

@Injectable()
export class BreedEffects {
  constructor(
    private actions$: Actions,
    private breedService: BreedService
  ) {}

  getBreedList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBreedList),
      mergeMap(() =>
        this.breedService.getBreedList().pipe(
          map((breeds) => getBreedListSuccess({ breeds })),
          catchError((error) => of(getBreedListFailure({ error })))
        )
      )
    )
  );

  getBreedDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBreedDetails),
      mergeMap((action) =>
        this.breedService.getBreedDetails(action.breedName).pipe(
          map((breedDetails) => getBreedDetailsSuccess({ breedDetails })),
          catchError((error) => of(getBreedDetailsFailure({ error })))
        )
      )
    )
  );
}
