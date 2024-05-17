import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreedDetails, getBreedList } from '../state/breeds/breed.actions';
import { breedReducer } from '../state/breeds/breed.reducer';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BreedDetails } from '../state/breeds/breed.model';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPageComponent implements OnInit {
  breedList$: Observable<string[]> = this.store.select(breedReducer.selectBreedList);
  breedDetails$: Observable<BreedDetails> = this.store.select(breedReducer.selectBreedDetails)

  constructor(private store: Store, private router: Router) {}

  ngOnInit(){
    this.store.dispatch(getBreedList())
  }

  onBreedClick(breedName: string) {
    this.store.dispatch(getBreedDetails({ breedName }));
    this.router.navigate(['/breed-details', breedName]); 
  }
}
