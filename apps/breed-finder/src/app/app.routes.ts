import { Route } from '@angular/router';
import { OverviewPageComponent } from './overview/overview.page';
import { BreedDetailsComponent } from './breed-details/breed-details.component';

export const appRoutes: Route[] = [
  { path: '', component: OverviewPageComponent },
  { path: 'breed-details/:breedName', component: BreedDetailsComponent },
];
