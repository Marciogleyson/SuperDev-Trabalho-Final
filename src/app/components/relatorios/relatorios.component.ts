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
import { Router } from '@angular/router';
import { RelatorioService } from '../../services/relatorio.service';
import { DropdownModule } from 'primeng/dropdown';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    { label: 'PIX', value: 'PIX' },
    { label: 'Cartão', value: 'Cartão' },
  ];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private relatorioService: RelatorioService
  ) {}

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

    // Exibe todos os dados inicialmente
    this.relatoriosFiltrados = [...this.relatorios];
    this.carregandoRelatorios = false;
  }

  filtrarRelatorios() {
    console.log('Aplicando filtro com:', {
      placa: this.filtroPlaca,
      tipo: this.filtroTipo,
      pagamento: this.filtroPagamento,
      totalRegistros: this.relatorios.length
    });

    this.relatoriosFiltrados = this.relatorios.filter((r) => {
      const placaMatch = !this.filtroPlaca || (r.placa?.toLowerCase() || '').includes(this.filtroPlaca.toLowerCase());
      const tipoMatch = !this.filtroTipo || (r.tipo?.toLowerCase() || '') === this.filtroTipo.toLowerCase();
      const pagamentoMatch = !this.filtroPagamento || (r.formaPagamento?.toLowerCase() || '') === this.filtroPagamento.toLowerCase();
      return placaMatch && tipoMatch && pagamentoMatch;
    });

    console.log('Registros filtrados:', this.relatoriosFiltrados.length);
  }

  limparFiltros() {
    this.filtroPlaca = '';
    this.filtroTipo = '';
    this.filtroPagamento = '';
    this.relatoriosFiltrados = [...this.relatorios];
  }

  exportarPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Pagamentos', 14, 16);

    const colunas = [
      'ID',
      'Placa',
      'Tipo',
      'Entrada',
      'Saída',
      'Valor',
      'Forma Pagamento',
      'Status',
    ];

    const dados = this.relatoriosFiltrados.map(r => [
      r.id,
      r.placa,
      r.tipo,
      r.dataHoraEntrada.toLocaleString(),
      r.dataHoraSaida.toLocaleString(),
      r.valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      r.formaPagamento,
      r.statusPagamento
    ]);

    autoTable(doc, {
      head: [colunas],
      body: dados,
      startY: 20,
      styles: { fontSize: 8 }
    });

    doc.save('relatorio_pagamentos.pdf');
  }

  exportarExcel() {
    const dadosExcel = this.relatoriosFiltrados.map(r => ({
      ID: r.id,
      Placa: r.placa,
      Tipo: r.tipo,
      Entrada: r.dataHoraEntrada.toLocaleString(),
      Saída: r.dataHoraSaida.toLocaleString(),
      Valor: r.valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      FormaPagamento: r.formaPagamento,
      Status: r.statusPagamento,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    saveAs(blob, 'relatorio_pagamentos.xlsx');
  }

  imprimir() {
    window.print();
  }
  // adicionarDadosFicticios() {
  //   const agora = new Date();
  //   const dadosExemplo = [
  //     {
  //       placa: 'ASA3E55',
  //       tipo: 'Mensalista',
  //       dataHoraEntrada: '2025-08-06T08:00:00',
  //       dataHoraSaida: '2025-08-06T10:00:00',
  //       valorPago: 20,
  //       formaPagamento: 'PIX',
  //       statusPagamento: 'Pago'
  //     },
  //     {
  //       placa: 'XYZ1234',
  //       tipo: 'Diarista',
  //       dataHoraEntrada: '2025-08-06T09:30:00',
  //       dataHoraSaida: '2025-08-06T11:30:00',
  //       valorPago: 15,
  //       formaPagamento: 'Dinheiro',
  //       statusPagamento: 'Pendente'
  //     },
  //     {
  //       placa: 'ABC9876',
  //       tipo: 'Diarista',
  //       dataHoraEntrada: '2025-08-06T12:00:00',
  //       dataHoraSaida: '2025-08-06T14:00:00',
  //       valorPago: 25,
  //       formaPagamento: 'Cartão',
  //       statusPagamento: 'Pago'
  //     }
  //   ];

  //   localStorage.setItem('relatorios', JSON.stringify(dadosExemplo));
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Dados Fictícios',
  //     detail: 'Registros adicionados com sucesso!',
  //   });
  //   this.carregarRelatorios();
  // }
}
