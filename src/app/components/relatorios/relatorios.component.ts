import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Relatorio } from '../../models/relatorio';
import { Route, Router } from '@angular/router';
import { RelatorioService } from '../../services/relatorio.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-relatorio-pagamentos',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
    standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    DropdownModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class RelatorioComponent implements OnInit {
  carregandoRelatorios?: boolean;
  dataHora?: Date;

  relatorios: Array<Relatorio> = [];
  relatoriosFiltrados: Array<Relatorio> = [];

  filtroPlaca: string = '';
  filtroTipo: string = '';
  filtroPagamento: string = '';

tiposFiltro = [
  { label: 'Todos', value: '' },
  { label: 'Mensalista', value: 'Mensalista' },
  { label: 'Diarista', value: 'Diarista' },
];

formasPagamentoFiltro = [
  { label: 'Todos', value: '' },
  { label: 'Dinheiro', value: 'Dinheiro' },
  { label: 'PIX', value: 'Pix' },
  { label: 'Cartão', value: 'Cartão' },
];



  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageSetvice: MessageService,
    private relatorioService: RelatorioService,
  ){
    
  }
  ngOnInit() {
   this.carregarRelatorios();
  }

private carregarRelatorios() {
  this.carregandoRelatorios = true;


  const relatoriosLocal = JSON.parse(localStorage.getItem('relatorios') || '[]');

  this.relatorios = relatoriosLocal.map((r: any, index: number) => ({
    ...r,
    id: index + 1,
    dataHoraEntrada: new Date(r.dataHoraEntrada),
    dataHoraSaida: new Date(r.dataHoraSaida),
  }));

  this.relatoriosFiltrados = [...this.relatorios];
  this.carregandoRelatorios = false;
}
 
filtrarRelatorios() {
  this.relatoriosFiltrados = this.relatorios.filter(r =>
    (!this.filtroPlaca || (r.placa?.toLowerCase() || '').includes(this.filtroPlaca.toLowerCase())) &&
    (!this.filtroTipo || (r.tipo?.toLowerCase() || '') === this.filtroTipo.toLowerCase()) &&
    (!this.filtroPagamento || (r.formaPagamento?.toLowerCase() || '') === this.filtroPagamento.toLowerCase())
  );
}


  limparFiltros() {
    this.filtroPlaca = '';
    this.filtroTipo = '';
    this.filtroPagamento = '';
    this.relatoriosFiltrados = [...this.relatorios];
  }


  exportarPDF() {
   
    };

  exportarExcel() {
    };

  imprimir() {
    window.print();
  }
}