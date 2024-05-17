import { Injectable } from '@nestjs/common';
import { Breed } from './breed.model';
import breedList from '../assets/breed-list.json';

@Injectable()
export class BreedService {
  getAllBreeds(): string[] {
    const breedInfos: Breed[] = JSON.parse(JSON.stringify(breedList))
    return breedInfos.map((breedInfo) => breedInfo.name)
  }

  getBreedDetails(breedName: string): Breed[] | null {
    if (!breedName || breedName.trim() === '') {
      return null;
    }
    const matchingBreeds = breedList.filter(
      (breed) => breed.name.toLowerCase() === breedName.toLowerCase(),
    );
    return matchingBreeds.length > 0 ? matchingBreeds : null;
  }
}
