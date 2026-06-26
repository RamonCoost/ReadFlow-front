import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatIcon } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";



@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatCardModule,
    MatToolbar,
    MatIcon,
    MatToolbarRow,
    MatButton
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
