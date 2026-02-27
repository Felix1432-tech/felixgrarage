import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck } from 'lucide-react';
import audiImage from '@/assets/audi-garage.jpg';
import porscheImage from '@/assets/porsche-garage.jpg';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background with grid overlay */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 hero-grid-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-[1]" />

      {/* Car images - right side (desktop) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block z-0">
        <div className="relative w-full h-full">
          <img
            src={porscheImage}
            alt="Porsche 911 na Felix Garage"
            className="absolute top-[15%] right-8 w-[85%] h-[40%] object-cover rounded-2xl shadow-automotive opacity-90"
          />
          <img
            src={audiImage}
            alt="Audi A4 na Felix Garage"
            className="absolute bottom-[15%] right-16 w-[75%] h-[38%] object-cover rounded-2xl shadow-automotive opacity-80"
          />
          {/* Blue glow accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>
      </div>

      {/* Content - left side */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-xl">
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-foreground">
            Seja bem-vindo à{' '}
            <span className="text-primary">Felix Garage</span>, sua oficina
            especializada em veículos premium.
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl mb-8 leading-relaxed max-w-md">
            Diagnóstico preciso, atendimento rápido e padrão premium para
            nacionais e importados.
          </p>
          <Button variant="automotive" size="lg" onClick={scrollToContact} className="gap-2 text-base px-8">
            <CalendarCheck className="w-5 h-5" />
            REALIZAR AGENDAMENTO
          </Button>
        </div>

        {/* Mobile car images */}
        <div className="flex gap-4 mt-12 lg:hidden overflow-x-auto pb-4">
          <img
            src={porscheImage}
            alt="Porsche 911 na Felix Garage"
            className="w-64 h-40 object-cover rounded-xl shadow-automotive flex-shrink-0"
          />
          <img
            src={audiImage}
            alt="Audi A4 na Felix Garage"
            className="w-64 h-40 object-cover rounded-xl shadow-automotive flex-shrink-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
