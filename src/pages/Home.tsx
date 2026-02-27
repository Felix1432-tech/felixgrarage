export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Header/Navigation */}
      <header style={{
        background: '#1a1a1a',
        color: '#fff',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>🚗 Felix Garage</h1>
          <nav style={{ display: 'flex', gap: '30px' }}>
            <a href="#inicio" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Início</a>
            <a href="#servicos" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Serviços</a>
            <a href="#sobre" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Sobre</a>
            <a href="#contato" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>Bem-vindo à Felix Garage</h2>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.9 }}>Sua mecânica de confiança para manutenção e reparo de veículos</p>
          <button style={{
            background: '#25D366',
            color: '#fff',
            border: 'none',
            padding: '15px 40px',
            fontSize: '18px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s'
          }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
             onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <a href="https://wa.me/5519995679592" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
              Fale Conosco no WhatsApp
            </a>
          </button>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" style={{
        padding: '80px 20px',
        background: '#f5f5f5'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', textAlign: 'center', marginBottom: '50px', fontWeight: 'bold' }}>Nossos Serviços</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {/* Serviço 1 */}
            <div style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s'
            }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔧</div>
              <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Manutenção</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Manutenção preventiva e corretiva para seu veículo</p>
            </div>

            {/* Serviço 2 */}
            <div style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s'
            }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚙️</div>
              <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Reparo</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Conserto rápido e eficiente de problemas mecânicos</p>
            </div>

            {/* Serviço 3 */}
            <div style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s'
            }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🛞</div>
              <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Pneus</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Venda, montagem e alinhamento de pneus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" style={{
        padding: '80px 20px',
        background: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', marginBottom: '30px', fontWeight: 'bold' }}>Sobre a Felix Garage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px', color: '#555' }}>
                Com anos de experiência no ramo automotivo, a Felix Garage é sua melhor opção para manutenção e reparo de veículos.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px', color: '#555' }}>
                Contamos com uma equipe qualificada e equipamentos modernos para garantir o melhor serviço para seu carro.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                Venha conhecer nossos serviços e descubra por que somos a escolha de tantos clientes satisfeitos.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: '300px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '60px'
            }}>
              🚗
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" style={{
        padding: '80px 20px',
        background: '#f5f5f5',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', marginBottom: '30px', fontWeight: 'bold' }}>Entre em Contato</h2>
          <p style={{ fontSize: '20px', marginBottom: '30px', color: '#555' }}>
            Tire suas dúvidas ou agende um serviço conosco
          </p>
          <a href="https://wa.me/5519995679592" target="_blank" rel="noopener noreferrer"
             style={{
               display: 'inline-block',
               background: '#25D366',
               color: '#fff',
               padding: '18px 50px',
               fontSize: '18px',
               borderRadius: '50px',
               textDecoration: 'none',
               fontWeight: 'bold',
               boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
               transition: 'transform 0.3s'
             }}
             onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
             onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            📱 Enviar Mensagem WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        color: '#fff',
        padding: '30px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ marginBottom: '10px' }}>© 2026 Felix Garage - Todos os direitos reservados</p>
          <p style={{ color: '#999' }}>Avenida Principal, 123 - Sua Cidade, SP</p>
          <p style={{ color: '#999' }}>Telefone: (19) 9 9567-9592</p>
        </div>
      </footer>
    </div>
  );
}
