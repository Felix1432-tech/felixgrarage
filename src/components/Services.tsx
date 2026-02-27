import React from 'react';
import { Search, Settings, Disc3, Cpu, Thermometer, ShieldCheck } from 'lucide-react';

const Services = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: Search,
      title: 'Diagnóstico Eletrônico',
      description: 'Leitura de falhas, análise de parâmetros e testes atuadores com scanner de última geração.',
    },
    {
      icon: Settings,
      title: 'Revisão Completa',
      description: 'Troca de óleo, filtros, velas, correia e checklist completo para manter seu carro perfeito.',
    },
    {
      icon: Disc3,
      title: 'Freios e Suspensão',
      description: 'Pastilhas, discos, amortecedores e alinhamento para segurança e conforto máximos.',
    },
    {
      icon: Cpu,
      title: 'Injeção e Eletrônica',
      description: 'Reparo de módulos, sensores, atuadores e sistemas de injeção direta (GDI).',
    },
    {
      icon: Thermometer,
      title: 'Arrefecimento',
      description: 'Radiador, bomba d\'água, válvula termostática e limpeza do sistema de arrefecimento.',
    },
    {
      icon: ShieldCheck,
      title: 'Preventiva Premium',
      description: 'Pacote exclusivo de manutenção preventiva para veículos nacionais e importados.',
    },
  ];

  return (
    <section id="services" className="py-20 scroll-mt-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        <h2 className="font-montserrat text-3xl sm:text-4xl mb-2">Nossos Serviços</h2>
        <p className="text-muted-foreground mb-10 max-w-lg">
          Diagnóstico certeiro, reparos de alta precisão e atendimento profissional para todos os tipos de veículos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={index}
                onClick={scrollToContact}
                className="group bg-gradient-card border border-border rounded-2xl p-6 text-left shadow-automotive hover:border-primary/30 hover:-translate-y-1 hover:shadow-primary-glow/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-montserrat text-lg mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
