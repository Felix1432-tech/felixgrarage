import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    veiculo: '',
    ano: '',
    mensagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Olá! Vim pelo site Felix Garage.
Nome: ${formData.nome}
WhatsApp: ${formData.whatsapp}
Veículo: ${formData.veiculo}
Ano: ${formData.ano}
Mensagem: ${formData.mensagem}`;

    const url = `https://wa.me/5519995679592?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full bg-background border border-border text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground';

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="container mx-auto max-w-[1200px] px-6">
        <h2 className="font-montserrat text-3xl sm:text-4xl mb-2">Entre em Contato</h2>
        <p className="text-muted-foreground mb-10">
          Preencha o formulário e envie direto pelo WhatsApp.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gradient-card border border-border rounded-2xl p-6 shadow-automotive">
            <h3 className="font-montserrat text-xl mb-6">Agende seu Serviço</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                placeholder="Seu Nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="Seu WhatsApp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="veiculo"
                placeholder="Veículo (marca/modelo)"
                required
                value={formData.veiculo}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="text"
                name="ano"
                placeholder="Ano"
                value={formData.ano}
                onChange={handleChange}
                className={inputClass}
              />
              <textarea
                name="mensagem"
                placeholder="Descreva o problema / o que precisa"
                value={formData.mensagem}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-y min-h-[100px]`}
              />
              <Button type="submit" variant="automotive" size="lg" className="w-full gap-2">
                <MessageCircle className="w-5 h-5" />
                Enviar no WhatsApp
              </Button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-gradient-card border border-border rounded-2xl p-6 shadow-automotive">
            <h3 className="font-montserrat text-xl mb-6">Nossa Localização</h3>
            <div className="aspect-video rounded-xl overflow-hidden border border-border">
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                src="https://www.google.com/maps?q=Felix+Garage&output=embed"
                className="w-full h-full border-0"
                title="Localização da Felix Garage"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
