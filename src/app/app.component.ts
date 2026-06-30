import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
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
    this.http.get(`${environment.apiUrl}/health`).subscribe({
      next: (data) => this.response = data,
      error: (err) => this.response = { error: err.message }
    });
  }
}
