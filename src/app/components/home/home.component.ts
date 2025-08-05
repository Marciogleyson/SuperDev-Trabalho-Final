import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, DividerModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  planos = [
    {
      titulo: 'Básico',
      preco: 'R$ 199/mês',
      recursos: [
        'Controle de até 50 vagas',
        'Relatórios básicos',
        'Suporte por email',
        'Atualizações gratuitas'
      ],
      destaque: false
    },
    {
      titulo: 'Profissional',
      preco: 'R$ 349/mês',
      recursos: [
        'Controle de até 150 vagas',
        'Relatórios avançados',
        'Suporte prioritário',
        'Gestão de mensalistas',
        'Aplicativo móvel'
      ],
      destaque: true
    },
    {
      titulo: 'Empresarial',
      preco: 'R$ 599/mês',
      recursos: [
        'Vagas ilimitadas',
        'Relatórios personalizados',
        'Suporte 24/7',
        'Gestão multi-estacionamentos',
        'Integração com sistemas de pagamento',
        'API para integrações'
      ],
      destaque: false
    }
  ];

  depoimentos = [
    {
      nome: 'Carlos Silva',
      cargo: 'Gerente de Estacionamento',
      empresa: 'Parking Plus',
      texto: 'O RMT Park revolucionou a forma como gerenciamos nosso estacionamento. Reduzimos o tempo de entrada e saída em 70% e aumentamos nossa receita em 25%.',
      imagem: 'assets/depoimento1.jpg'
    },
    {
      nome: 'Ana Oliveira',
      cargo: 'Proprietária',
      empresa: 'Estacionamento Central',
      texto: 'Depois de implementar o RMT Park, conseguimos eliminar filas e melhorar significativamente a satisfação dos nossos clientes. O controle financeiro é excepcional!',
      imagem: 'assets/depoimento2.jpg'
    },
    {
      nome: 'Roberto Mendes',
      cargo: 'Diretor Operacional',
      empresa: 'Rede Park Express',
      texto: 'Gerenciar múltiplos estacionamentos nunca foi tão fácil. O sistema é intuitivo e nos fornece dados precisos para tomada de decisões estratégicas.',
      imagem: 'assets/depoimento3.jpg'
    }
  ];

  recursos = [
    {
      titulo: 'Controle de Vagas em Tempo Real',
      descricao: 'Visualize a ocupação do seu estacionamento em tempo real e otimize o uso do espaço.',
      icone: 'pi pi-clock'
    },
    {
      titulo: 'Gestão de Mensalistas',
      descricao: 'Cadastre e gerencie clientes mensalistas com facilidade, incluindo renovações automáticas.',
      icone: 'pi pi-users'
    },
    {
      titulo: 'Relatórios Detalhados',
      descricao: 'Acesse relatórios financeiros e operacionais para tomar decisões baseadas em dados.',
      icone: 'pi pi-chart-bar'
    },
    {
      titulo: 'Aplicativo Móvel',
      descricao: 'Gerencie seu estacionamento de qualquer lugar através do nosso aplicativo para iOS e Android.',
      icone: 'pi pi-mobile'
    }
  ];

  constructor(private router: Router) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}