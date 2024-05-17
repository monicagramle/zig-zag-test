import { Controller, Get, Param } from '@nestjs/common';

import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  getBreeds(): string[] {
    return this.breedService.getAllBreeds();
  }

  @Get(':breedName')
  getBreedDetails(@Param('breedName') breedName: string) {
    const breedDetails = this.breedService.getBreedDetails(breedName);
    if (!breedDetails) {
      return { message: 'Breed not found' };
    }
    return breedDetails;
  }
}
