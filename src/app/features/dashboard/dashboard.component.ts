import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatCardModule,
    MatIcon
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
