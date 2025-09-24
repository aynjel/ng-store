import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from './resource-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ResourceService {
  constructor(private http: HttpClient) {
    super(http);
  }
}
