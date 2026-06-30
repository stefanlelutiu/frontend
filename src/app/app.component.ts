import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Azure Full Stack Demo</h1>
    <p>Frontend is calling the backend API.</p>
    <button (click)="loadHealth()">Check backend health</button>
    <pre>{{ response | json }}</pre>
  `
})
export class AppComponent implements OnInit {
  response: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHealth();
  }

  loadHealth(): void {
    this.http.get<unknown>(`${environment.apiUrl}/health`).subscribe({
      next: (data: unknown) => this.response = data,
      error: (err: { message: string }) => this.response = { error: err.message }
    });
  }
}
