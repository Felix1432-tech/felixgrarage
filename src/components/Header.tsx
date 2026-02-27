import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Serviços', id: 'services' },
    { label: 'Sobre Nós', id: 'about' },
    { label: 'Importados', id: 'importados' },
    { label: 'Contato', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-automotive'
          : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between gap-4 px-6 py-4 max-w-[1200px] mx-auto">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-montserrat font-extrabold text-xl tracking-[3px] hover:opacity-80 transition-opacity"
        >
          FELIX <span className="text-primary">GARAGE</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-7 list-none">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground font-medium text-sm hover:text-foreground transition-colors uppercase tracking-wide"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <Button
          variant="automotive"
          size="lg"
          onClick={() => scrollToSection('contact')}
          className="hidden sm:inline-flex whitespace-nowrap"
        >
          AGENDAMENTO
        </Button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2"
          aria-label="Abrir menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border p-6">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-muted-foreground font-medium hover:text-foreground transition-colors text-left w-full uppercase tracking-wide"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Button
                  variant="automotive"
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-2"
                >
                  AGENDAMENTO
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
