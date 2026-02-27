import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: 'Excelente serviço, atendimento impecável e resolveram meu problema rapidamente!',
      name: 'João Silva',
    },
    {
      rating: 5,
      text: 'Honestos e muito atenciosos. Voltarei sempre que precisar!',
      name: 'Marina Costa',
    },
    {
      rating: 5,
      text: 'Diagnóstico preciso e preço justo. Recomendo demais.',
      name: 'Carlos Lima',
    },
  ];

  return (
    <section id="testimonials" className="py-20 scroll-mt-20 bg-secondary/30">
      <div className="container mx-auto max-w-[1200px] px-6">
        <h2 className="font-montserrat text-3xl sm:text-4xl mb-10 text-center">
          Quem conhece, recomenda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gradient-card border border-border rounded-2xl p-6 shadow-automotive"
            >
              <div className="flex mb-4 gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed">"{t.text}"</p>
              <span className="font-montserrat font-semibold text-sm text-muted-foreground">
                — {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
