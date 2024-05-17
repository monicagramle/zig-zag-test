import { Test, TestingModule } from '@nestjs/testing';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';

describe('BreedController', () => {
  let breedController: BreedController;
  let breedService: BreedService;

  const mockBreedList = ['Pomeranian', 'Labrador'];
  const mockBreedDetails = [
    { name: 'Pomeranian', origin: 'Germany', description: 'A small dog breed' },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedController],
      providers: [
        {
          provide: BreedService,
          useValue: {
            getAllBreeds: jest.fn().mockReturnValue(mockBreedList),
            getBreedDetails: jest.fn().mockImplementation((breedName: string) => {
              return breedName.toLowerCase() === 'pomeranian'
                ? mockBreedDetails
                : null;
            }),
          },
        },
      ],
    }).compile();

    breedController = module.get<BreedController>(BreedController);
    breedService = module.get<BreedService>(BreedService);
  });

  describe('getAllBreeds', () => {
    it('should return an array of breed names', () => {
      expect(breedController.getBreeds()).toEqual(mockBreedList);
      expect(breedService.getAllBreeds).toHaveBeenCalled();
    });
  });

  describe('getBreedDetails', () => {
    it('should return breed details if breed exists', () => {
      expect(breedController.getBreedDetails('Pomeranian')).toEqual(mockBreedDetails);
      expect(breedService.getBreedDetails).toHaveBeenCalledWith('Pomeranian');
    });

    it('should return a message if breed does not exist', () => {
      expect(breedController.getBreedDetails('UnknownBreed')).toEqual({ message: 'Breed not found' });
      expect(breedService.getBreedDetails).toHaveBeenCalledWith('UnknownBreed');
    });
  });
});
