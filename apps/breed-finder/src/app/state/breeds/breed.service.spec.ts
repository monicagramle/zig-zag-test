import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BreedService } from './breed.service';
import { BreedDetails } from './breed.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('BreedService', () => {
  let service: BreedService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

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
      imports: [HttpClientTestingModule],
      providers: [BreedService],
    });

    service = TestBed.inject(BreedService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    jest.spyOn(httpClient, 'get').mockImplementation((url: string) => {
      if (url === 'http://localhost:3000/api/breed') {
        return of(mockBreedList);
      } else if (url === 'http://localhost:3000/api/breed/Pomeranian') {
        return of(mockBreedDetails);
      } else {
        return of([]);
      }
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreedList', () => {
    it('should return expected breed list', (done) => {
      service.getBreedList().subscribe((breeds) => {
        expect(breeds).toEqual(mockBreedList);
        expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/api/breed');
        done();
      });
    });
  });

  describe('getBreedDetails', () => {
    it('should return expected breed details', (done) => {
      service.getBreedDetails('Pomeranian').subscribe((details) => {
        expect(details).toEqual(mockBreedDetails);
        expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/api/breed/Pomeranian');
        done();
      });
    });

    it('should return empty array if breed not found', (done) => {
      service.getBreedDetails('UnknownBreed').subscribe((details) => {
        expect(details).toEqual([]);
        expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/api/breed/UnknownBreed');
        done();
      });
    });
  });
});
