import { createFeature, createReducer, on } from '@ngrx/store';
import { BreedState } from './breed.model';
import { getBreedDetailsSuccess, getBreedListSuccess } from './breed.actions';

export const initialState: BreedState = {
  breedList: [],
  breedDetails: {
    name: '',
    description: '',
    size: '',
    origin: '',
    lifeExpectancy: '',
    temperament: [],
    image: ''
  }
};

export const breedReducer = createFeature({
  name: 'breedState',
  reducer: createReducer(
    initialState,
    on(getBreedListSuccess, (state, {breeds}) => {
      return {
        ...state,
        breedList: breeds
      }
    }),
    on(getBreedDetailsSuccess, (state, {breedDetails}) => {
      return {
        ...state,
        breedDetails: breedDetails[0]
      }
    })
  )
});
