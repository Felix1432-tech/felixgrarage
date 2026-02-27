import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Importados = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const brands = [
    {
      name: 'Audi',
      tagline: 'Tecnologia e performance com precisão alemã.',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'BMW',
      tagline: 'Potência e sofisticação em cada detalhe.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Mercedes-Benz',
      tagline: 'Elegância e engenharia incomparáveis.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section id="importados" className="py-20 scroll-mt-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        <h2 className="font-montserrat text-3xl sm:text-4xl mb-2">Importados & Alto Padrão</h2>
        <p className="text-muted-foreground mb-10 max-w-lg">
          Experiência comprovada com as marcas mais exigentes do mercado.
        </p>

        <div className="space-y-8">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center bg-gradient-card border border-border rounded-2xl overflow-hidden shadow-automotive`}
            >
              <div className="lg:w-1/2 w-full">
                <img
                  src={brand.image}
                  alt={`${brand.name} na Felix Garage`}
                  loading="lazy"
                  className="w-full h-64 lg:h-72 object-cover"
                />
              </div>
              <div className="lg:w-1/2 w-full p-8">
                <h3 className="font-montserrat text-2xl mb-2 text-foreground">{brand.name}</h3>
                <p className="text-muted-foreground mb-6 text-lg">{brand.tagline}</p>
                <Button
                  variant="automotive"
                  onClick={scrollToContact}
                  className="gap-2"
                >
                  Agendar Serviço <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Importados;
