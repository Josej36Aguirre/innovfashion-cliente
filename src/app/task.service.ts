import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private baseURL = "http://localhost:8080/api/task";
  constructor(
    private http:HttpClient
  ) { }

  getAll(){
    return this.http.get('http://localhost:8080/api/task');
  }

  create(task: any){
    return this.http.post('http://localhost:8080/api/task',task);
  }

  update(href: string, task: any){
    return this.http.put(href,task);
  }

  delete(href: string)  {
    return this.http.delete(href);
  }
}
