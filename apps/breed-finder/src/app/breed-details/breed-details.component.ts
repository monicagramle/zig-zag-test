import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BreedDetails } from '../state/breeds/breed.model';
import { getBreedDetails } from '../state/breeds/breed.actions';
import { breedReducer } from '../state/breeds/breed.reducer';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf],
  selector: 'app-breed-details',
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss'] 
})
export class BreedDetailsComponent implements OnInit {
    breedDetails$: Observable<BreedDetails> = this.store.select(breedReducer.selectBreedDetails)

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    const breedName = this.route.snapshot.paramMap.get('breedName');
    if (breedName) {
        this.store.dispatch(getBreedDetails({ breedName }));
      } else {
        console.error('No breed name provided in route');
      }
  }
}