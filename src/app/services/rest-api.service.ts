import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private apiUrl = 'http://localhost:5000/tasks/';
  private apiUrlProduct = 'http://localhost:5000/products/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteTask(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<any>(url);
  }

  updateTaskReminder(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<any>(url, task, httpOptions);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, httpOptions);
  }

  postProduct(data: any) {
    return this.http.post(this.apiUrlProduct, data);
  }

  getProduct() {
    return this.http.get<any[]>(this.apiUrlProduct);
  }

  putProduct(data: any, id: number) {
    return this.http.put(this.apiUrlProduct + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.apiUrlProduct + id);
  }

}