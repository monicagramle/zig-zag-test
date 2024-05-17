import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { BreedEffects } from './breed.effects';
import { BreedService } from './breed.service';
import { 
  getBreedList, getBreedListFailure, getBreedListSuccess,
  getBreedDetails, getBreedDetailsFailure, getBreedDetailsSuccess 
} from './breed.actions';
import { BreedDetails } from './breed.model';

describe('BreedEffects', () => {
  let actions: Observable<unknown>;
  let effects: BreedEffects;
  let service: BreedService;
  let store: MockStore;

  const mockBreedList = ['Pomeranian', 'Poodle'];
  const mockBreedDetails: BreedDetails[] = [
    {
      "name": "Pomeranian",
      "description": "Pomeranians are lively, friendly, and extroverted dogs. They have a thick double coat and a fox-like expression. Pomeranians are great companions and do well in various living situations.",
      "size": "Small",
      "origin": "Germany, Poland",
      "lifeExpectancy": "12-16 years",
      "temperament": [
        "Lively",
        "Friendly",
        "Extroverted",
        "Intelligent"
      ],
      "image": "https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-07/Pomeranian.jpg?itok=BGe-1DFz"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedEffects,
        provideMockStore(),
        provideMockActions(() => actions),
        {
          provide: BreedService,
          useValue: {
            getBreedList: jest.fn(),
            getBreedDetails: jest.fn(),
          }
        }
      ]
    });

    service = TestBed.inject(BreedService);
    effects = TestBed.inject(BreedEffects);
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getBreedList$', () => {
    describe('when the service returns successfully', () => {
      it('should dispatch getBreedListSuccess', () => {
        actions = hot('-a', { a: getBreedList() });

        const serviceResponse = cold('-a', { a: mockBreedList });
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedListSuccess({ breeds: mockBreedList }) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });

    describe('when the service returns an error', () => {
      it('should dispatch getBreedListFailure', () => {
        const error = new Error('oops');

        actions = hot('-a', { a: getBreedList() });

        const serviceResponse = cold('-#|', {}, error);
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedListFailure({ error }) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });
  });

  describe('getBreedDetails$', () => {
    describe('when the service returns successfully', () => {
      it('should dispatch getBreedDetailsSuccess', () => {
        const breedName = 'Pomeranian';
        actions = hot('-a', { a: getBreedDetails({ breedName }) });

        const serviceResponse = cold('-a', { a: mockBreedDetails });
        service.getBreedDetails = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedDetailsSuccess({ breedDetails: mockBreedDetails }) });

        expect(effects.getBreedDetails$).toBeObservable(expected);
        expect(service.getBreedDetails).toHaveBeenCalledWith(breedName);
      });
    });

    describe('when the service returns an error', () => {
      it('should dispatch getBreedDetailsFailure', () => {
        const breedName = 'Pomeranian';
        const error = new Error('oops');
        actions = hot('-a', { a: getBreedDetails({ breedName }) });

        const serviceResponse = cold('-#|', {}, error);
        service.getBreedDetails = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedDetailsFailure({ error }) });

        expect(effects.getBreedDetails$).toBeObservable(expected);
        expect(service.getBreedDetails).toHaveBeenCalledWith(breedName);
      });
    });
  });
});
