import { createAction, props } from '@ngrx/store';
import { BreedDetails } from './breed.model';

export const getBreedList = createAction('[Breed] Get Breed List');

export const getBreedListSuccess = createAction(
  '[Breed] Get Breed List Success',
  props<{ breeds: string[] }>(),
);

export const getBreedListFailure = createAction(
  '[Breed] Get Breed List Failure',
  props<{ error: Error }>(),
);

export const getBreedDetails = createAction(
  '[Breed] Get Breed Details',
  props<{ breedName: string }>()
);

export const getBreedDetailsSuccess = createAction(
  '[Breed] Get Breed Details Success',
  props<{ breedDetails: BreedDetails[] }>(),
);

export const getBreedDetailsFailure = createAction(
  '[Breed] Get Breed Details Failure',
  props<{ error: Error }>(),
);
