import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-public-header',
  imports: [MatToolbarModule, MatButton, RouterLink],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.scss'
})
export class PublicHeaderComponent implements OnInit, OnDestroy {
  rotaAtual: string = '';
  inscricaoRota!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rotaAtual = this.router.url
    this.inscricaoRota = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((evento: NavigationEnd) => {
      this.rotaAtual = evento.url
    });
  }

  ngOnDestroy(): void {
    this.inscricaoRota.unsubscribe();
  }

  isOnRouteRegister(): boolean {
    return this.rotaAtual === '/register'
  }
}
