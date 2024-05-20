import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderPageComponent {

  constructor(private router: Router){}

  Home(){
    this.router.navigate(['']);
  }
}
