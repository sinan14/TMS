import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  private _api:string =environment.baseUrl;
  loginAdmin(user: any) {
    return this.http.post<any>('http://localhost:3000/admin', { admin: user });
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getRequestlist() {
    return this.http.get('http://localhost:3000/requestlist');
  }
  Reject(id: any) {
    return this.http.delete('http://localhost:3000/reject/' + id);
  }
  getRequest(id: any) {
    return this.http.get('http://localhost:3000/approverequest/' + id);
  }
  getApprove(approvedtrainer: any) {
    return this.http
      .post('http://localhost:3000/approvedtrainer', approvedtrainer)
      .subscribe((data) => {
        console.log(data);
      });
  }
  searchByName(name: any) {
    return this.http.get('http://localhost:3000/search/' + name);
  }
  getTrainers() {
    return this.http.get('http://localhost:3000/getTrainers');
  }
  searchBySkill(skill: any) {
    console.log(skill);
    return this.http.get('http://localhost:3000/search/skill/' + skill);
  }
  searchByType(typeemp: any) {
    return this.http.get('http://localhost:3000/search/type/' + typeemp);
  }
  searchByCourse(course: any) {
    return this.http.get('http://localhost:3000/search/course/' + course);
  }
  getTrainer(id: any) {
    return this.http.get('http://localhost:3000/getTrainer/' + id);
  }
  schedule(allocatedtrainer: any) {
    return this.http
      .post('http://localhost:3000/trainerallocate', allocatedtrainer)
      .subscribe((data) => {
        console.log(data);
      });
  }
  checkDates(email: any) {
    return this.http.post('http://localhost:3000/checkdates', { email: email });
  }
  getAllocatedlist() {
    return this.http.get('http://localhost:3000/allocatedlist');
  }
  Remove(id: any) {
    return this.http.delete('http://localhost:3000/remove/' + id);
  }
  getNumbers() {
    return this.http.get('http://localhost:3000/getnumbers');
  }
}
