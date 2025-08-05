import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Relatorio } from '../models/relatorio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private urlAPI: string;
  constructor(private http: HttpClient) {
    this.urlAPI = "http//localhost:4200/"
  }

  obterTodos(): Observable<Relatorio[]> {
    return this.http.get<Relatorio[]>(this.urlAPI)
  }
  obterPorId(id: number): Observable<Relatorio> {
    return this.http.get<Relatorio>(`${this.urlAPI}/${id}`);
  }
  registrar(relatorio: Relatorio): Observable<any> {
   return this.http.post(`${this.urlAPI}/relatorios`, relatorio);
  }
  excluir(id: number): Observable<any> {
  return this.http.delete(`${this.urlAPI}/relatorios/${id}`);
}


}
