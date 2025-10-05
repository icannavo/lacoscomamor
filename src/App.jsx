import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Menu, 
  X, 
  Heart, 
  Sparkles, 
  TreePine, 
  Home, 
  PartyPopper, 
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [currentSlides, setCurrentSlides] = useState({
    pessoais: 0,
    sazonais: 0,
    casa: 0,
    eventos: 0,
    utilitarios: 0
  })

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre', 'produtos', 'guirlandas', 'contato']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Product categories with placeholder images
  const categories = {
    pessoais: {
      title: '🧵 Enfeites Pessoais',
      description: 'Acessórios de moda feitos à mão',
      items: ['Laços e tiaras', 'Presilhas e scrunchies', 'Headbands', 'Bijuterias artesanais', 'Broches personalizados']
    },
    sazonais: {
      title: '🎄 Enfeites Sazonais',
      description: 'Decorações para todas as épocas do ano',
      items: ['Guirlandas natalinas', 'Enfeites de árvore', 'Centros de mesa', 'Decoração de Páscoa', 'Festa Junina']
    },
    casa: {
      title: '🏡 Enfeites para Casa',
      description: 'Decoração de interiores com charme artesanal',
      items: ['Quadros artesanais', 'Mandalas e filtros dos sonhos', 'Capas de almofadas', 'Vasos decorativos', 'Velas artesanais']
    },
    eventos: {
      title: '🎉 Enfeites para Eventos',
      description: 'Torne suas festas inesquecíveis',
      items: ['Toppers para bolos', 'Lembrancinhas personalizadas', 'Centros de mesa', 'Varais decorativos', 'Convites artesanais']
    },
    utilitarios: {
      title: '🍽️ Enfeites Utilitários',
      description: 'Beleza e funcionalidade juntas',
      items: ['Panos bordados', 'Porta-talheres', 'Ímãs decorativos', 'Móbiles para berço', 'Marca-páginas criativos']
    }
  }

  const nextSlide = (category) => {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: (prev[category] + 1) % categories[category].items.length
    }))
  }

  const prevSlide = (category) => {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: prev[category] === 0 ? categories[category].items.length - 1 : prev[category] - 1
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-red-50 to-green-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="text-red-600 fill-red-600" size={28} />
              <span className="text-2xl font-bold text-red-800">Laços com Amor</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              {['inicio', 'sobre', 'produtos', 'guirlandas', 'contato'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-red-600 transition-colors ${
                    activeSection === section ? 'text-red-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              {['inicio', 'sobre', 'produtos', 'guirlandas', 'contato'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-left py-2 hover:text-red-600 transition-colors ${
                    activeSection === section ? 'text-red-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center gap-4">
              <Sparkles className="text-yellow-500 animate-pulse" size={40} />
              <Heart className="text-red-500 fill-red-500 animate-bounce" size={40} />
              <Sparkles className="text-yellow-500 animate-pulse" size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-6">
              Laços com Amor
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
              "Feitos à mão com amor para tornar cada momento especial."
            </p>
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6"
              onClick={() => window.open('https://wa.me/351969232165', '_blank')}
            >
              <MessageCircle className="mr-2" />
              ENCOMENDAR AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-8">
            Sobre a Marca
          </h2>
          <Card className="border-2 border-red-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-300 to-pink-300 rounded-full flex items-center justify-center">
                    <Heart className="text-white fill-white" size={64} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-700 mb-4">Ivani Amorim</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bem-vindo ao <strong>Laços com Amor</strong>, onde cada peça conta uma história de dedicação e carinho. 
                    Sou a Ivani Amorim, e tenho o prazer de criar produtos artesanais únicos que trazem beleza e 
                    significado para o seu dia a dia e ocasiões especiais.
                  </p>
                  <p className="text-red-600 font-semibold italic">
                    "Cada peça é feita à mão com dedicação, amor e atenção aos detalhes."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-12">
            Categorias de Produtos
          </h2>
          
          <div className="space-y-12">
            {Object.entries(categories).map(([key, category]) => (
              <Card key={key} className="border-2 border-red-200 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-red-700 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  {/* Carousel */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {key === 'pessoais' && '🧵'}
                          {key === 'sazonais' && '🎄'}
                          {key === 'casa' && '🏡'}
                          {key === 'eventos' && '🎉'}
                          {key === 'utilitarios' && '🍽️'}
                        </div>
                        <p className="text-xl font-semibold text-red-800">
                          {category.items[currentSlides[key]]}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {currentSlides[key] + 1} / {category.items.length}
                        </p>
                      </div>
                    </div>
                    
                    {/* Carousel Controls */}
                    <button
                      onClick={() => prevSlide(key)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="text-red-600" size={24} />
                    </button>
                    <button
                      onClick={() => nextSlide(key)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="text-red-600" size={24} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guirlandas Section */}
      <section id="guirlandas" className="py-16 px-4 bg-gradient-to-br from-green-100 to-red-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <TreePine className="inline-block text-green-700 mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              O Significado das Guirlandas
            </h2>
          </div>
          
          <Card className="border-2 border-green-300">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-3">
                  <div className="text-2xl">🚪</div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1">Boas-vindas e Confraternização</h4>
                    <p className="text-gray-700 text-sm">Símbolo de hospitalidade e acolhimento</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-2xl">✨</div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1">Espírito Natalino e União</h4>
                    <p className="text-gray-700 text-sm">Celebra o amor e a união familiar</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-2xl">🌿</div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1">Esperança e Vida</h4>
                    <p className="text-gray-700 text-sm">Representa renovação e esperança</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-2xl">💰</div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1">Prosperidade e Abundância</h4>
                    <p className="text-gray-700 text-sm">Atrai boas energias e prosperidade</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-1">Proteção e Boas Energias</h4>
                    <p className="text-gray-700 text-sm">Protege o lar e seus habitantes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-600 text-white p-6 rounded-lg text-center">
                <p className="text-xl md:text-2xl font-bold mb-2">
                  🎁 O Natal está a chegar! 🎄
                </p>
                <p className="text-lg">
                  Garanta já a sua guirlanda rústica por apenas <span className="text-3xl font-bold">4 €</span>
                </p>
                <p className="text-sm mt-2">✨🔔❄🌲</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-12">
            Contato
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-red-700 mb-6">Entre em Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-red-600" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800">Telefone</p>
                      <a href="tel:+351969232165" className="text-red-600 hover:underline">
                        +351 969 232 165
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="text-red-600" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800">E-mail</p>
                      <a href="mailto:ivaniamorim314@gmail.com" className="text-red-600 hover:underline">
                        ivaniamorim314@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open('https://wa.me/351969232165', '_blank')}
                    >
                      <MessageCircle className="mr-2" />
                      Fale Connosco pelo WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Form */}
            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-red-700 mb-6">Envie uma Mensagem</h3>
                
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault()
                  alert('Obrigado! Em breve entraremos em contato.')
                }}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                    <Input placeholder="Seu nome" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                    <Input type="email" placeholder="seu@email.com" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem</label>
                    <Textarea placeholder="Sua mensagem..." rows={4} required />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="fill-white" size={24} />
            <span className="text-xl font-bold">Laços com Amor</span>
          </div>
          <p className="text-red-200 mb-2">Produtos artesanais feitos com dedicação e carinho</p>
          <p className="text-red-300 text-sm">© 2025 Laços com Amor - Ivani Amorim. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
