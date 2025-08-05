import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Vaga } from "../models/vaga";
import { VagaCadastro } from "../models/vaga-cadastro";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class VagaService {
    private urlAPI: string;
  constructor(private http: HttpClient) {
    this.urlAPI = "http://localhost:4200/";
  }

  cadastrar(vagaCadastro: VagaCadastro): Observable<Vaga>{
    return this.http.post<Vaga>(this.urlAPI, vagaCadastro);
  }
  obterTodos() : Observable<Vaga[]>{
    return this.http.get<Vaga[]>(this.urlAPI)
  }
  obterPorId(id: number): Observable<Vaga>{
    return this.http.get<Vaga>(`${this.urlAPI}/${id}`);
  }
  saida(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlAPI}/${id}`);
  }

}
