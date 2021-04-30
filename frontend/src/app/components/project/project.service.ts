import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from './project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = "http://localhost:3000/projeto"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError:boolean =false): void{
   this.snackBar.open(msg,'',{
     duration: 3000,
     horizontalPosition: "right",
     verticalPosition: "top",
     panelClass: isError ? ['msg=error'] : ['msg-sucess']

   })
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project). pipe(
      map(obj => obj),
      catchError(e =>this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY

  }

  read(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl)
  };

  readById(id: string): Observable<Project> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(project: Project): Observable<Project>{
    const url = `${this.baseUrl}/${project.id}`
    return this.http.put<Project>(url,project);
  }

  delete(id: string): Observable<Project>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Project>(url);
  }
}



