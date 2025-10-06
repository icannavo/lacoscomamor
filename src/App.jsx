import { useState, useEffect } from 'react'
import la1 from './assets/la1.jpg'
import la2 from './assets/la2.jpg'
import la3 from './assets/la3.jpg'
import la4 from './assets/la4.jpg'
import la5 from './assets/la5.jpg'
import la6 from './assets/la6.jpg'
import guir0 from './assets/Guir0.png'
import guir2 from './assets/guir2.png'
import guir3 from './assets/guir3.png'
import guir4 from './assets/guir4.png'
import casa2 from './assets/casa2.png'
import casa3 from './assets/casa3.png'
import casa4 from './assets/casa4.png'
import casa5 from './assets/casa5.png'
import casa6 from './assets/casa6.png'
import casa7 from './assets/casa7.png'



import reactLogo from './assets/react.svg'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'




import {
  Menu,
  Instagram,
  Facebook, 
  X,
  Heart,
  Gift,
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
    lacos: 0,
    Natal: 0,
    casa: 0
  })
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Images for carousels per category (replace with real images as they are added to assets)
  const categoryImages = {
    lacos: [la1, la2, la3, la4, la5, la6],
    Natal: [guir0, guir2, guir3, guir4],
    casa: [casa2, casa3, casa4, casa5, casa6, casa7],
  }

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
    lacos: {
      title: '🎀 Laços',
      description: 'Laços feitos à mão',
      items: ['Laço vermelho', 'Laço amarelo', 'Laço rosa', 'Laço roxo', 'Laço lilas, Laço azul']
    },
    Natal: {
      title: '🎄 Enfeites Natal',
      description: 'Decorações para todas as épocas do ano',
      items: ['Guirlandas natalinas', 'Enfeites de árvore', 'Centros de mesa', 'Decoração de Páscoa', 'Festa Junina']
    },
    casa: {
      title: '🏡 Enfeites para Casa',
      description: 'Decoração de interiores com charme artesanal',
      items: ['Quadros artesanais', 'Mandalas e filtros dos sonhos', 'Capas de almofadas', 'Vasos decorativos', 'Velas artesanais']
    },
  }

  const nextSlide = (category) => {
    const slidesCount = categoryImages[category]?.length || 0
    if (slidesCount === 0) return
    setCurrentSlides(prev => ({
      ...prev,
      [category]: (prev[category] + 1) % slidesCount
    }))
  }

  const prevSlide = (category) => {
    const slidesCount = categoryImages[category]?.length || 0
    if (slidesCount === 0) return
    setCurrentSlides(prev => ({
      ...prev,
      [category]: prev[category] === 0 ? slidesCount - 1 : prev[category] - 1
    }))
  }

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

const handleWhatsAppSubmit = (e) => {
 e.preventDefault()
 const { name, email, message } = contactForm

 // Usa `\n` e confia no `encodeURIComponent` para transformá-lo em %0A
 const whatsappMessage = 
 `Olá! Gostaria de fazer um contato.
Meu nome é: ${name}
Meu e-mail é: ${email}
Mensagem: ${message}`;

 // O `encodeURIComponent` converte a string acima em algo como:
 // Olá!%20Gostaria%20de%20fazer%20um%20contato.%0AMeu%20nome%20é:%20Israel...
 const whatsappLink = `https://wa.me/351969232165?text=${encodeURIComponent(whatsappMessage)}`;
 window.open(whatsappLink, '_blank');
 }

  return (
    <div className="min-h-screen website-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gift className="text-red-600 red-600" size={28} />
              <span className="text-2xl font-bold text-red-800">Laços com Amor</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-2xl">
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
                  
                  {/* Carousel (Images) */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-lg p-2 min-h-[250px] flex items-center justify-center overflow-hidden">
                      {categoryImages[key] && categoryImages[key].length > 0 ? (
                        <img
                          src={categoryImages[key][currentSlides[key]] || reactLogo}
                          alt={`${category.title} imagem ${currentSlides[key] + 1}`}
                          className="h-full ?w-full object-cover rounded-md shadow"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={reactLogo}
                          alt={`${category.title} placeholder`}
                          className="w-full h-[300px] object-contain opacity-70"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute bottom-3 right-3 bg-white/80 text-gray-800 text-xs px-2 py-1 rounded">
                        {currentSlides[key] + 1} / {(categoryImages[key]?.length || 0)}
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
                  Garanta já a sua guirlanda rústica e linda<span className="text-3xl font-bold"></span>
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
                      <a href="tel:+351969232165" className="text-red-600 hover:underline text-xl">
                        +351 969 232 165
                      </a>
                                          <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open('https://api.whatsapp.com/send/?phone=351969232165', '_blank')}
                    >
                      <MessageCircle className="mr-2" />
                      Fale Connosco WhatsApp
                    </Button>

                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="text-red-600" size={24} />
                    <div>
        <p className="font-semibold text-gray-800 text-xl">E-mail</p><p className="font-semibold text-gray-800">
          </p> <a href="mailto:ivaniamorim314@gmail.com" className="text-red-600 hover:underline"> ivaniamorim314@gmail.com </a>
        
        <a
          href="mailto:ivaniamorim314@gmail.com"
          className="inline-block bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Enviar E-mail
        </a>

                    </div>
                  </div>
                  
                  <div className="pt-4">
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Form */}
            <Card className="border-2 border-red-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-red-700 mb-6">Faça seu pedido</h3>
                
                <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                    <Input 
                      placeholder="Seu nome" 
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                    <Input 
                      type="email" 
                      placeholder="seu@email.com" 
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem</label>
                    <Textarea 
                      placeholder="Sua mensagem..." 
                      rows={4} 
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="mr-2" />
                    Enviar pedido WhatsApp
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
          
          {/* Logo e Nome */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <Gift className="white" size={24} />
            <span className="text-xl font-bold">Laços com Amor</span>
          </div>

          <p className="text-red-200 mb-  ">Produtos artesanais feitos com dedicação e carinho</p>
          
          {/* ÍCONES DE REDES SOCIAIS (Instagram e Facebook) */}
          <div className="flex justify-center gap-4 mb-4">
            
            {/* Link para Instagram */}
            <a 
              href="https://www.instagram.com/ivani_amorim10?igsh=MWJteG41dDI1dGt4dA== " // Endereço base do Instagram
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-red-300 transition-colors mt-2"
              aria-label="Instagram da Laços com Amor"
            >
              <Instagram size={42} />
            </a>

            {/* Link para Facebook */}
            <a 
              href="https://www.facebook.com/ivani.amorim.10" // Endereço base do Facebook
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-red-300 transition-colors mt-2"
              aria-label="Facebook da Laços com Amor"
            >
              <Facebook size={42} />
            </a>
          </div>
          {/* FIM DOS ÍCONES DE REDES SOCIAIS */}

          <p className="text-red-300 text-sm">© 2025 Laços com Amor - Ivani Amorim. Todos os direitos reservados.</p>
        </div>
      </footer>    </div>
  )
}

export default App
