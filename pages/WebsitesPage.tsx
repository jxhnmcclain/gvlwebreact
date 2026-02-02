import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight, Globe, Laptop, Zap, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CtaBanner from '../components/CtaBanner';

const WebsitesPage = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = () => {
    navigate('/contacto', { state: { background: location } });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1
      });
      gsap.from(".web-project", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".web-grid",
          start: "top 80%"
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: '01',
      title: "E-commerce de Rendimiento",
      category: "Ventas & Conversión Chile",
      video: "/videos/web 1.mp4",
      description: "Desarrollo de tiendas online en Santiago optimizadas para vender más. Experiencia de usuario (UX) diseñada para el consumidor chileno.",
      color: "bg-[#f3f3f3]"
    },
    {
      id: '02',
      title: "Portfolio Creativo Pro",
      category: "Branding & Motion Design",
      video: "/videos/coffe_web.mp4",
      description: "Sitios web para agencias y profesionales con animaciones premium que elevan la percepción de marca en el mercado nacional.",
      color: "bg-[#e2e2e2]"
    },
    {
      id: '03',
      title: "Corporativo Premium",
      category: "Soluciones Enterprise",
      video: "/videos/web-placeholder-3.mp4",
      description: "Arquitectura web robusta e institucional para empresas líderes en Santiago de Chile que buscan autoridad digital.",
      color: "bg-[#f9f9f9]"
    }
  ];

  return (
    <div ref={container} className="pt-32 md:pt-48 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="anim-title text-6xl md:text-[120px] font-black uppercase tracking-tighter mb-8 leading-[0.85]">
              Diseño Web <br />
              <span className="text-stroke-black text-transparent" style={{ WebkitTextStroke: '2px black' }}>en Santiago</span>
            </h1>
            <p className="anim-title text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-light">
              Creamos sitios web de alto impacto y Landing Pages optimizadas para empresas en Chile. Fusionamos diseño cinematográfico con estrategias de conversión para que tu negocio destaque en el mercado digital de Santiago.
            </p>

            <div className="anim-title flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={goToContact}
                className="bg-black text-white rounded-full px-10 py-5 text-lg font-bold flex items-center gap-3 hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                Iniciar mi Web
                <ArrowUpRight size={20} />
              </button>

              <div
                className="flex items-center gap-4 p-2 pr-6 rounded-full border border-black/10 bg-gray-50 backdrop-blur-sm cursor-pointer hover:bg-white transition-colors group"
                onClick={goToContact}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gvl-orange">
                  <img src="/pfp.jpg" alt="Creative Director" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-widest text-gvl-orange">Hablemos</p>
                  <p className="text-sm font-bold">Asesoría Directa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="px-4 md:px-12 pb-32 web-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-24 md:gap-40">
          {projects.map((project, index) => (
            <div key={project.id} className={`web-project flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
              {/* Browser Mockup */}
              <div className="w-full md:w-3/5">
                <div className="relative aspect-video rounded-[2rem] border-2 border-black overflow-hidden shadow-[30px_30px_0px_0px_rgba(0,0,0,0.05)] bg-black group">
                  {/* Browser Bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-white border-b-2 border-black flex items-center px-6 gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 flex-1 bg-gray-100 h-6 rounded-md border border-black/10 flex items-center px-3">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                      <div className="w-24 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  {/* Video Container */}
                  <div className="absolute inset-0 pt-10 overflow-hidden pointer-events-none">
                    <video
                      src={project.video}
                      className="w-full h-full object-cover"
                      autoPlay loop muted playsInline
                    />
                    <div className="absolute inset-0 bg-black/5"></div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full md:w-2/5 space-y-6">
                <span className="text-6xl md:text-8xl font-black text-black/5 block leading-none">{project.id}</span>
                <div>
                  <p className="text-gvl-orange font-bold uppercase tracking-widest text-sm mb-2">{project.category}</p>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">{project.title}</h3>
                  <p className="text-xl text-gray-600 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                    <Zap size={14} className="text-yellow-500" /> Fast Loading
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                    <Globe size={14} className="text-blue-500" /> SEO Ready
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                    <Laptop size={14} className="text-purple-500" /> UI/UX Focus
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 md:px-12 py-32 bg-gray-50 border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 underline decoration-gvl-orange decoration-4 underline-offset-8">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-500">Todo lo que necesitas saber sobre nuestro servicio de diseño web en Chile.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "¿Cuánto tiempo toma desarrollar un sitio web en Santiago?",
                a: "Dependiendo de la complejidad, una Landing Page puede estar lista en 1-2 semanas, mientras que un proyecto corporativo completo o E-commerce puede tardar entre 4 a 6 semanas."
              },
              {
                q: "¿Tienen servicios de mantenimiento para empresas en Chile?",
                a: "Sí, ofrecemos planes de soporte y mantenimiento mensual para asegurar que tu sitio web esté siempre actualizado, seguro y funcionando al 100% en servidores optimizados."
              },
              {
                q: "¿El diseño web es amigable para móviles (Responsive)?",
                a: "Absolutamente. Todos nuestros proyectos se diseñan con un enfoque 'Mobile-First', garantizando que tu web se vea increíble en iPhone, Android y tablets."
              },
              {
                q: "¿Me ayudan con el hosting y el dominio .cl?",
                a: "Te asesoramos en todo el proceso de compra de dominio con proveedores oficiales y configuración de hosting de alta velocidad para que no tengas que preocuparte por la parte técnica."
              },
              {
                q: "¿Hacen SEO para posicionar en Google Chile?",
                a: "Sí, todos nuestros sitios incluyen una optimización SEO base: velocidad de carga relámpago, etiquetas meta correctas y arquitectura limpia para que Google te encuentre fácilmente."
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl border border-black/10 hover:border-black transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex justify-between items-center group-hover:text-gvl-orange transition-colors">
                  {item.q}
                  <MousePointer2 size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default WebsitesPage;