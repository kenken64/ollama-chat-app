import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OllamaService {

  constructor(private http: HttpClient) { }

  chatWithOllama(message: string): Promise<any> {
    message = message.trim();
    const options = message ? { params: 
      new HttpParams().set('message', message) } : {};
    
    const url = 'http://localhost:3000/api/chat';
    return lastValueFrom(this.http.get(url, options));
  }
}
