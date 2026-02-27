import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto max-w-[1200px] px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-montserrat font-bold text-sm tracking-[2px]">
          FELIX <span className="text-primary">GARAGE</span>
        </span>
        <p className="text-muted-foreground text-sm text-center">
          © {currentYear} Felix Garage — Oficina Premium. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
