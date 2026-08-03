import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    SidebarComponent,
    MatIconModule,
    MatIconButton
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  private readonly breakpointObserver = inject(BreakpointObserver);
  isMobile = false;
  
  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 992px').subscribe(result => {
     this.isMobile = result.matches;
    })
  }
}
