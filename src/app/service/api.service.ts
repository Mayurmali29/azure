import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://zingpmsbaseapi.azurewebsites.net/api/';
  constructor(private api: HttpClient) {}

  getCountryData() {
    return this.api.post(`${this.baseUrl}Country/GetList`, {});
  }
  insertData(data: any) {
    return this.api.post(`${this.baseUrl}Country/Insert`, data);
  }
  delete(data: any) {
    return this.api.post(`${this.baseUrl}Country/Delete`, data);
  }
  updateData(data: any) {
    return this.api.post(`${this.baseUrl}Country/Update`, data);
  }
}
