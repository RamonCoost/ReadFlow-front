import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './core/service/health.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  protected readonly healthService: HealthService = inject(HealthService);

  title = 'readflow';

  ngOnInit(): void {
    this.healthService.verificarBackend();
  }
}
