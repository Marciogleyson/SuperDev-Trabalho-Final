import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Funcionarios } from "../models/funcionarios";

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  private urlAPI: string;
  constructor(private http: HttpClient) {
    this.urlAPI = "http://localhost:4200/";
  }
  cadastrar(funcionarios: Funcionarios): Observable<Funcionarios> {
    return this.http.post<Funcionarios>(this.urlAPI, Funcionarios);
  }
  obterTodos(): Observable<Funcionarios[]> {
    return this.http.get<Funcionarios[]>(this.urlAPI)
  }
  obterPorId(id: number): Observable<Funcionarios> {
    return this.http.get<Funcionarios>(`${this.urlAPI}/${id}`);
  }
  apagar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
  }
}


