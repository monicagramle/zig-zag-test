import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderPageComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    HeaderPageComponent,
    RouterModule,
    HttpClientModule,
    CommonModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
