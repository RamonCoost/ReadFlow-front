import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatButton,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    RouterLink
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
