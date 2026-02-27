import React from 'react';
import { CheckCircle, Award, Eye, Sparkles } from 'lucide-react';

const About = () => {
  const highlights = [
    { icon: Award, text: '25 anos de experiência no mercado automotivo' },
    { icon: Eye, text: 'Transparência total em cada orçamento e serviço' },
    { icon: Sparkles, text: 'Padrão premium para nacionais e importados' },
  ];

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-montserrat text-3xl sm:text-4xl mb-4">Sobre Nós</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A Felix Garage nasceu da paixão por automóveis e do compromisso com a excelência.
              Oferecemos soluções completas com atendimento personalizado, equipamentos de última
              geração e uma equipe altamente qualificada.
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
              alt="Interior da oficina Felix Garage"
              loading="lazy"
              className="w-full rounded-2xl shadow-automotive"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-2xl blur-[60px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
