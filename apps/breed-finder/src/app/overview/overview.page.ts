import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreedDetails, getBreedList } from '../state/breeds/breed.actions';
import { breedReducer } from '../state/breeds/breed.reducer';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreedDetails } from '../state/breeds/breed.model';

@Component({
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, RouterModule],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss']
})
export class OverviewPageComponent implements OnInit {
  breedList$: Observable<string[]> = this.store.select(breedReducer.selectBreedList);
  breedDetails$: Observable<BreedDetails> = this.store.select(breedReducer.selectBreedDetails);
  filteredBreedList$!: Observable<string[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(){
    this.store.dispatch(getBreedList());
    this.filteredBreedList$ = this.breedList$;
  }

  filterResults(text: string) {
    this.filteredBreedList$ = this.breedList$.pipe(
      map(breeds => breeds.filter(breed => breed.toLowerCase().includes(text.toLowerCase())))
    );
    console.log(this.filteredBreedList$);
  }

  onBreedClick(breedName: string) {
    this.router.navigate(['/breed-details', breedName]); 
  }
}
