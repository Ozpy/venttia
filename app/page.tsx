"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413z"/>
  </svg>
);

const phone = "5215500000000"; 
const generateWaLink = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

const Pill = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="inline-flex items-center gap-2 text-sm font-semibold text-teal bg-teal/10 border border-teal/20 px-4 py-1.5 rounded-full mb-8 shadow-sm"
  >
    <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
    {children}
  </motion.div>
);

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloatingBlob = ({ className }: { className: string }) => (
  <div
    className={`absolute pointer-events-none rounded-full blur-[120px] opacity-80 ${className}`}
  />
);

const CardSpotlight = ({ children, className = "", variant = "light" }: { children: React.ReactNode, className?: string, variant?: "light" | "dark" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glowColor = variant === "dark" ? "rgba(56, 191, 167, 0.18)" : "rgba(17, 124, 138, 0.08)";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative group rounded-3xl ${className}`}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                320px circle at ${mouseX}px ${mouseY}px,
                ${glowColor},
                transparent 80%
              )
            `,
          }}
        />
      </div>
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

// Custom helpers for spotlight text animations
import { useMotionValue, useMotionTemplate } from "framer-motion";

const ScrollRevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0.25, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-wrap leading-relaxed ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={childVariants} className="mr-2 my-1">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-teal selection:text-white overflow-x-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-grid-slate mask-radial-faded opacity-55"
      />
      <FloatingBlob className="top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal/20" />
      <FloatingBlob className="bottom-[150px] right-[-10%] w-[40%] h-[40%] bg-mint/20" />
      
      {/* 1) NAV */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 border-b ${scrolled ? 'bg-white/80 backdrop-blur-xl border-border shadow-md' : 'bg-transparent border-transparent'}`}
      >
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logotipo.png" alt="Logotipo Venttia" width={140} height={40} className="h-8 w-auto object-contain mix-blend-multiply" priority />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-navy/80">
            <a href="#diferenciador" className="hover:text-teal transition-colors">¿Qué es?</a>
            <a href="#paquetes" className="hover:text-teal transition-colors">Sistemas</a>
            <a href="#sectores" className="hover:text-teal transition-colors">Sectores</a>
          </div>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={generateWaLink("Hola, te contacto desde la web. Quiero agendar el diagnóstico de 10 minutos para mi negocio.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors hover:bg-teal shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Solicitar diagnóstico</span>
            <span className="inline sm:hidden">Diagnóstico</span>
          </motion.a>
        </div>
      </motion.nav>

      <main className="relative z-10 flex-1 flex flex-col">
        {/* 2) HERO */}
        <section className="pt-28 pb-20 px-6 md:pt-36 md:pb-32 max-w-6xl mx-auto w-full text-center md:text-left relative">
          <div className="absolute right-0 top-20 w-64 h-64 bg-mint/10 rounded-full blur-[80px] -z-10 hidden md:block" />
          
          <div className="relative z-10">
            <Pill>Modernizamos negocios locales sin complicaciones</Pill>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8 text-navy"
            >
              Haz que tu negocio se vea<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-[#20A0B0] to-teal/80">
                y funcione más profesional.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl text-navy/80 leading-relaxed mb-10 mx-auto md:mx-0 font-medium"
            >
              Configuramos herramientas simples para que tu negocio consiga más clientes, se vea profesional y sea más fácil para tus clientes agendar o contactarte. Conectamos Google Maps, WhatsApp y reservas de forma simple.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16 justify-center md:justify-start"
            >
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(17,124,138,0.2)" }}
                whileTap={{ scale: 0.95 }}
                href={generateWaLink("Hola, quiero mi diagnóstico comercial gratis.")}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors hover:bg-navy"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Solicitar diagnóstico gratis
              </motion.a>
              <motion.a 
                whileHover={{ x: 5 }}
                href="#diferenciador"
                className="w-full sm:w-auto text-center px-8 py-4 font-semibold text-navy hover:text-teal transition-colors"
              >
                Ver cómo lo hacemos &rarr;
              </motion.a>
            </motion.div>
          </div>
          
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border relative">
              <CardSpotlight className="border border-border">
                <div className="bg-white p-6 h-full">
                  <div className="text-xl font-extrabold text-teal mb-2">Más Visibilidad</div>
                  <div className="text-sm text-navy/80 font-medium">Optimizamos tu perfil de Google Maps para que más clientes locales te encuentren al buscar tus servicios.</div>
                </div>
              </CardSpotlight>
              <CardSpotlight className="border border-border">
                <div className="bg-white p-6 h-full">
                  <div className="text-xl font-extrabold text-teal mb-2">Menos Fricción</div>
                  <div className="text-sm text-navy/80 font-medium">Configuramos reservas simples y WhatsApp profesional para que sea muy fácil contactarte y nunca pierdas un cliente.</div>
                </div>
              </CardSpotlight>
              <CardSpotlight className="border border-border">
                <div className="bg-white p-6 h-full">
                  <div className="text-xl font-extrabold text-navy mb-2">Mantenimiento Real</div>
                  <div className="text-sm text-navy/80 font-medium">Nos encargamos de que todo siga funcionando: cambios de horarios, información, actualizaciones y soporte mensual continuo.</div>
                </div>
              </CardSpotlight>
            </div>
          </FadeUp>
        </section>

        {/* 3) PROBLEMAS */}
        <section className="py-24 px-6 bg-white border-y border-border relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-16 max-w-3xl text-navy">
                Problemas reales de los negocios locales.<br />
                <span className="text-teal">Nosotros nos encargamos de solucionarlos.</span>
              </h2>
            </FadeUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Clientes que no saben cómo reservar", desc: "No hay un enlace claro y tus clientes tienen que mandar varios mensajes solo para saber cuándo tienes libre." },
                { title: "Negocio difícil de encontrar en Google", desc: "Apareces muy abajo al buscar tus servicios en tu zona o tu perfil de Google Maps está abandonado." },
                { title: "Información diferente en cada red social", desc: "Tus horarios, dirección o teléfono no coinciden entre Facebook, Instagram y Google Business." },
                { title: "Pocas reseñas recientes", desc: "Tienes clientes contentos todos los días, pero ninguno te deja una recomendación en Google Maps." },
                { title: "Clientes que olvidan citas (No-shows)", desc: "Personas que agendan de palabra y olvidan asistir porque nadie les mandó un recordatorio amistoso." },
                { title: "WhatsApp usado de forma amateur", desc: "No tienes un catálogo ordenado, respuestas automáticas, ni información de contacto configurada." },
                { title: "Links rotos o inexistentes", desc: "Los botones en tus perfiles de redes sociales no abren o mandan a páginas de error." },
                { title: "Horarios y servicios mal mostrados", desc: "Tus servicios actuales y precios no están visibles de forma clara y profesional." },
                { title: "Mucho tiempo respondiendo preguntas básicas", desc: "Tú o tu equipo pierden horas repitiendo manualmente la ubicación, precios o formas de pago." },
                { title: "Negocio que no transmite confianza digital", desc: "Una imagen digital descuidada hace que los clientes elijan a un competidor que se ve más profesional." }
              ].map((pain, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <CardSpotlight className="border border-border h-full">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex gap-6 p-6 md:p-8 bg-white h-full items-start cursor-default"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-teal font-bold shrink-0 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-navy font-bold text-lg mb-1">{pain.title}</h3>
                        <p className="text-navy/80 font-medium leading-relaxed text-sm">{pain.desc}</p>
                      </div>
                    </motion.div>
                  </CardSpotlight>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 4) NUEVO ENFOQUE / DIFERENCIADOR */}
        <section id="diferenciador" className="py-24 px-6 bg-slate-50 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeUp>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal bg-teal/10 border border-teal/20 px-4 py-1.5 rounded-full mb-8 shadow-sm">
                    La Gran Diferencia
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-navy mb-8">
                    Las herramientas ya existen.<br />
                    <span className="text-teal">El problema es configurarlas bien.</span>
                  </h2>
                  <p className="text-lg text-navy/80 font-medium leading-relaxed mb-6">
                    No necesitas softwares caros ni complicados de entender. Google Maps, WhatsApp y los sistemas de reservas son excelentes.
                  </p>
                  <div className="pl-6 border-l-4 border-teal mb-8">
                    <ScrollRevealText 
                      text="Nosotros conectamos Google, WhatsApp, reservas y reseñas de forma simple y profesional. Lo dejamos funcionando al 100% para ti."
                      className="text-xl font-semibold text-navy/95"
                    />
                  </div>
                  <p className="text-lg text-navy/80 font-medium leading-relaxed">
                    <strong>Nuestro diferenciador real es simple: nos encargamos de todo por ti.</strong> No te damos un manual ni un software para que lo hagas tú solo. Nosotros somos los técnicos premium que modernizan tu negocio y se aseguran de que todo siga funcionando mes con mes.
                  </p>
                </FadeUp>
              </div>
              <div className="lg:col-span-5 space-y-6">
                {[
                  { title: "Nos encargamos de todo", desc: "Hacemos la configuración completa, conectamos las herramientas y nos aseguramos de que todo funcione de forma simple y profesional." },
                  { title: "Foco en Google Maps", desc: "Optimizamos tu ficha de Google Maps para que destaques en tu zona, captes más reseñas y te encuentren primero." },
                  { title: "Mantenimiento incluido", desc: "No te dejamos solo. Nos encargamos de los cambios de horarios, información y soporte para que no te preocupes por nada." }
                ].map((item, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <CardSpotlight className="border border-border bg-white p-6">
                      <div className="flex gap-4 items-start">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal/10 text-teal font-bold shrink-0">
                          ✓
                        </div>
                        <div>
                          <h4 className="font-bold text-navy mb-1">{item.title}</h4>
                          <p className="text-navy/70 text-sm font-medium">{item.desc}</p>
                        </div>
                      </div>
                    </CardSpotlight>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5) TRES PILARES OPERATIVOS */}
        <section className="py-24 px-6 bg-white border-b border-border">
          <div className="max-w-6xl mx-auto">
            <FadeUp className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">
                Lo que dejamos funcionando en tu negocio
              </h2>
              <p className="text-lg text-navy/60 font-medium max-w-2xl mx-auto">
                Configuramos herramientas prácticas que te traen más clientes, te ahorran tiempo y mejoran tu imagen.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pilar Google Maps y Reseñas */}
              <FadeUp delay={0.1}>
                <CardSpotlight className="border border-border h-full bg-white flex flex-col group">
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-navy">Google Maps y Reseñas</h3>
                    <p className="text-navy/80 font-medium leading-relaxed mb-6 text-sm">
                      <strong>"Haz que te encuentren primero."</strong> Optimizamos tu ficha de Google Maps para aparecer más arriba en búsquedas. Además, te entregamos un tag físico inteligente NFC para captar reseñas de 5 estrellas en tu local.
                    </p>
                    <ul className="space-y-3 text-navy/70 text-sm font-medium mb-6">
                      <li className="flex gap-2">✓ Perfil de Google Maps optimizado</li>
                      <li className="flex gap-2">✓ Más opiniones reales de tus clientes</li>
                      <li className="flex gap-2">✓ Mayor visibilidad en búsquedas locales</li>
                    </ul>

                    {/* Mini Google Maps Card Mockup */}
                    <div className="mt-auto p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs font-semibold space-y-2.5 shadow-sm group-hover:border-teal/20 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-teal font-extrabold flex items-center gap-1">📍 Google Maps</span>
                        <span className="bg-emerald-500/10 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-bold">✓ Verificado</span>
                      </div>
                      <div className="text-navy font-bold text-sm">Tu Negocio Local</div>
                      <div className="flex items-center gap-1 text-[#F5A623]">
                        <span>5.0</span>
                        <span>★★★★★</span>
                        <span className="text-navy/50 text-[10px] font-medium">(142 reseñas)</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-teal/10 text-teal text-[9px] px-2 py-1 rounded-md">🚀 NFC Activo</span>
                        <span className="bg-navy/5 text-navy/60 text-[9px] px-2 py-1 rounded-md">📈 +32 esta semana</span>
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </FadeUp>

              {/* Pilar Agenda y Reservas */}
              <FadeUp delay={0.2}>
                <CardSpotlight className="border border-border h-full bg-white flex flex-col group">
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-navy">Agenda y Reservas</h3>
                    <p className="text-navy/80 font-medium leading-relaxed mb-6 text-sm">
                      <strong>"Reservas más fáciles y sin no-shows."</strong> Configuramos una agenda digital simple sincronizada a tu celular. Tus clientes agendan solos y el sistema les envía recordatorios automáticos por WhatsApp.
                    </p>
                    <ul className="space-y-3 text-navy/70 text-sm font-medium mb-6">
                      <li className="flex gap-2">✓ Reservas en línea fluidas en 3 clics</li>
                      <li className="flex gap-2">✓ Menos citas olvidadas por tus clientes</li>
                      <li className="flex gap-2">✓ Horarios y disponibilidad en tiempo real</li>
                    </ul>

                    {/* Mini Agenda Mockup */}
                    <div className="mt-auto p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs font-semibold space-y-2.5 shadow-sm group-hover:border-teal/20 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-teal font-extrabold flex items-center gap-1">📅 Reservas en Línea</span>
                        <span className="text-navy/40 font-medium">100% Libre</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border border-teal bg-teal/5 text-teal text-center py-2 rounded-lg font-bold text-[10px]">10:00 AM</div>
                        <div className="border border-slate-200 bg-white text-navy/30 text-center py-2 rounded-lg font-medium cursor-not-allowed text-[10px]">11:30 AM</div>
                        <div className="border border-teal bg-teal/5 text-teal text-center py-2 rounded-lg font-bold text-[10px]">01:00 PM</div>
                      </div>
                      <div className="bg-teal text-white text-center py-2 rounded-xl text-[9px] font-bold shadow-sm">
                        ✓ Cita Confirmada · WhatsApp Enviado
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </FadeUp>

              {/* Pilar WhatsApp y Landing */}
              <FadeUp delay={0.3}>
                <CardSpotlight className="border border-border h-full bg-white flex flex-col group">
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-navy">WhatsApp y Landing</h3>
                    <p className="text-navy/80 font-medium leading-relaxed mb-6 text-sm">
                      <strong>"Tu negocio, ordenado y profesional."</strong> Organizamos tu WhatsApp Business y creamos una landing page simple para tus perfiles de redes que centraliza links, catálogo básico, horarios y ubicación.
                    </p>
                    <ul className="space-y-3 text-navy/70 text-sm font-medium mb-6">
                      <li className="flex gap-2">✓ WhatsApp Business bien estructurado</li>
                      <li className="flex gap-2">✓ Enlace único para tu bio de Instagram/TikTok</li>
                      <li className="flex gap-2">✓ Ubicación y servicios unificados</li>
                    </ul>

                    {/* Mini Link-in-Bio / WhatsApp Mockup */}
                    <div className="mt-auto p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs font-semibold space-y-2.5 shadow-sm group-hover:border-teal/20 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-teal font-extrabold flex items-center gap-1">💬 WhatsApp de Negocios</span>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="bg-white border border-slate-200 p-2 rounded-xl text-[9px] text-navy/80 font-medium leading-relaxed">
                          "Hola! Bienvenido. ¿Qué servicio te gustaría agendar hoy?"
                        </div>
                        <div className="flex flex-col gap-1.5 pt-1">
                          <div className="border border-teal/20 hover:border-teal bg-white text-teal text-center py-1.5 rounded-lg text-[9px] font-bold transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]">📅 Agendar Cita Online</div>
                          <div className="border border-slate-200 hover:border-navy bg-white text-navy/70 text-center py-1.5 rounded-lg text-[9px] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]">📍 Ver Ubicación en Maps</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* 6) NUEVA ESTRUCTURA DE PAQUETES */}
        <section id="paquetes" className="py-32 px-6 max-w-6xl mx-auto w-full">
          <FadeUp>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal bg-teal/10 border border-teal/20 px-4 py-1.5 rounded-full mb-8 shadow-sm">
              Paquetes de Organización Digital
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-navy">
              Elige tu nivel de organización digital.
            </h2>
            <p className="text-lg md:text-xl max-w-3xl text-navy/80 mb-16">
              Nosotros nos encargamos de toda la configuración inicial. El pago de mantenimiento mensual garantiza que todo siga optimizado, funcionando perfectamente y que tengas soporte continuo para cualquier cambio que necesites.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Paquete 1 — PRESENCIA DIGITAL */}
            <FadeUp delay={0.2} className="h-full">
              <CardSpotlight className="border border-border h-full bg-white flex flex-col">
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-sm font-bold text-teal mb-3 uppercase tracking-wider">Paquete 1</div>
                  <h3 className="text-3xl font-bold mb-4 text-navy">Presencia Digital</h3>
                  <p className="text-sm text-navy/70 mb-6 font-medium">"Haz que tu negocio se vea profesional en todos lados."</p>
                  
                  <div className="mb-8 border-b border-border pb-6">
                    <div className="text-4xl font-extrabold text-navy mb-1">$4,500 <span className="text-base text-navy/60 font-semibold">MXN pago inicial</span></div>
                    <div className="text-sm font-bold text-teal">Optimización y soporte: $600 MXN/mes</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8 text-navy/80 flex-1 font-medium text-sm">
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Configuración completa de Google Business</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Optimización de WhatsApp Business</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Landing page simple centralizada</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Enlaces y link único para redes</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Horarios y servicios bien mostrados</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Catálogo básico y respuestas rápidas</li>
                    <li className="flex gap-2 text-teal/90"><span className="font-bold">✓</span> Mantenimiento mensual incluido (abajo)</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={generateWaLink("Hola, quiero solicitar información de Presencia Digital.")} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block w-full text-center py-4 rounded-xl border-2 border-border text-navy font-bold hover:border-navy transition-colors mt-auto"
                  >
                    Elegir Presencia Digital
                  </motion.a>
                </div>
              </CardSpotlight>
            </FadeUp>

            {/* Paquete 2 — RESERVAS Y RESEÑAS */}
            <FadeUp delay={0.1} className="h-full lg:scale-105 relative z-20">
              <CardSpotlight variant="dark" className="bg-navy border border-teal/30 h-full flex flex-col relative shadow-[0_20px_50px_rgba(17,124,138,0.25)]">
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal/35 rounded-full blur-[90px]" />
                </div>
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal to-teal/80 text-white font-bold px-6 py-1.5 rounded-full text-sm shadow-md z-20">
                  Recomendado
                </div>
                
                <div className="p-8 md:p-10 flex flex-col flex-1 relative z-10 mt-2">
                  <div className="text-sm font-bold text-mint mb-3 uppercase tracking-wider">Paquete 2</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Reservas y Reseñas</h3>
                  <p className="text-sm text-mint mb-6 font-medium">"Menos caos. Citas y opiniones en orden."</p>
                  
                  <div className="mb-8 border-b border-white/20 pb-8">
                    <div className="text-5xl font-extrabold text-white mb-2">$7,500 <span className="text-lg text-white/70 font-semibold">MXN pago inicial</span></div>
                    <div className="text-sm font-bold text-mint">Optimización y soporte: $1,500 MXN/mes</div>
                  </div>
                  
                  <ul className="space-y-4 mb-10 text-white/90 flex-1 font-medium text-sm">
                    <li className="text-mint font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2 mb-2">INCLUYE TODO LO ANTERIOR MÁS:</li>
                    <li className="flex gap-2"><span className="text-mint font-bold">✓</span> Agenda digital simple integrada</li>
                    <li className="flex gap-2"><span className="text-mint font-bold">✓</span> Flujo de reservas en 3 clics</li>
                    <li className="flex gap-2"><span className="text-mint font-bold">✓</span> Recordatorios automáticos por WhatsApp</li>
                    <li className="flex gap-2"><span className="text-mint font-bold">✓</span> Tag físico inteligente NFC de mesa</li>
                    <li className="flex gap-2"><span className="text-mint font-bold">✓</span> Flujo optimizado para captar reseñas</li>
                    <li className="flex gap-2 text-mint/90"><span className="font-bold">✓</span> Mantenimiento mensual incluido (abajo)</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={generateWaLink("Hola, quiero elegir Reservas y Reseñas.")} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block w-full text-center py-4 rounded-xl bg-teal text-white font-bold text-lg hover:bg-mint hover:text-navy hover:shadow-lg transition-colors mt-auto"
                  >
                    Elegir Reservas y Reseñas
                  </motion.a>
                </div>
              </CardSpotlight>
            </FadeUp>

            {/* Paquete 3 — OPERACIÓN PLUS */}
            <FadeUp delay={0.3} className="h-full">
              <CardSpotlight className="border border-border h-full bg-white flex flex-col">
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-sm font-bold text-teal mb-3 uppercase tracking-wider">Paquete 3</div>
                  <h3 className="text-3xl font-bold mb-4 text-navy">Operación Plus</h3>
                  <p className="text-sm text-navy/70 mb-6 font-medium">"Configuración avanzada y soporte total."</p>
                  
                  <div className="mb-8 border-b border-border pb-6">
                    <div className="text-4xl font-extrabold text-navy mb-1">$15,000 <span className="text-base text-navy/60 font-semibold">MXN pago inicial</span></div>
                    <div className="text-sm font-bold text-teal">Optimización y soporte: $3,500 MXN/mes</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8 text-navy/80 flex-1 font-medium text-sm">
                    <li className="text-teal font-bold uppercase tracking-wider text-xs border-b border-border pb-2 mb-2">INCLUYE TODO LO ANTERIOR MÁS:</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Automatizaciones de respuestas simples</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Campañas básicas de contacto</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Mejoras y optimizaciones mensuales</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Actualizaciones ilimitadas de información</li>
                    <li className="flex gap-2"><span className="text-teal font-bold">✓</span> Soporte prioritario permanente</li>
                    <li className="flex gap-2 text-teal/90"><span className="font-bold">✓</span> Mantenimiento mensual premium</li>
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={generateWaLink("Hola, me interesa Operación Plus.")} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block w-full text-center py-4 rounded-xl border-2 border-border text-navy font-bold hover:border-navy transition-colors mt-auto"
                  >
                    Elegir Operación Plus
                  </motion.a>
                </div>
              </CardSpotlight>
            </FadeUp>
          </div>

          {/* Sección explicativa de mantenimiento mensual */}
          <FadeUp delay={0.4} className="mt-16">
            <CardSpotlight className="border border-border bg-slate-50 p-8 md:p-12 text-center rounded-3xl">
              <h4 className="text-2xl font-bold text-navy mb-4">¿Qué incluye el mantenimiento mensual?</h4>
              <p className="text-navy/70 text-base font-medium max-w-3xl mx-auto mb-8">
                El pago mensual no es solo una tarifa; es el respaldo técnico que asegura que tu negocio siga funcionando de forma profesional y optimizada día con día.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl mx-auto text-sm font-semibold text-navy/90">
                <div className="flex gap-2">✓ Actualización de horarios</div>
                <div className="flex gap-2">✓ Pequeños cambios de información</div>
                <div className="flex gap-2">✓ Optimización mensual de Google</div>
                <div className="flex gap-2">✓ Soporte técnico directo</div>
                <div className="flex gap-2">✓ Monitoreo de reseñas de Maps</div>
                <div className="flex gap-2">✓ Mantenimiento de agenda y links</div>
                <div className="flex gap-2">✓ Mejoras continuas del sistema</div>
                <div className="flex gap-2">✓ Cambios de precios o menús</div>
              </div>
            </CardSpotlight>
          </FadeUp>
        </section>

        {/* 7) IMPLEMENTACIÓN EXPRESS */}
        <section className="py-32 px-6 bg-slate-50 border-y border-border overflow-hidden">
          <div className="max-w-6xl mx-auto relative">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-20 max-w-3xl text-navy relative z-10">
                Dejamos todo listo y operando en <span className="text-teal">menos de 14 días.</span>
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                className="hidden md:block absolute top-8 left-10 w-[calc(100%-5rem)] h-1 bg-gradient-to-r from-border to-teal/30 rounded-full z-0 origin-left" 
              />
              
              {[
                { step: "1", title: "Diagnóstico", tag: "GRATIS", desc: "Te mostramos en una llamada de 10 minutos qué está mal en tu Google Maps, tu WhatsApp y tus reservas para darte oportunidades de mejora." },
                { step: "2", title: "Configuración", tag: "3-7 DÍAS", desc: "Nosotros configuramos y conectamos todo. Nos das acceso una sola vez y lo dejamos andando de forma profesional." },
                { step: "3", title: "Optimización", tag: "MANTENIMIENTO", desc: "El sistema empieza a recibir reseñas reales y organizar citas más fácil. Damos soporte continuo y nos encargamos de que todo siga funcionando." }
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.2} className="relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center text-2xl font-extrabold mb-6 shadow-md text-teal"
                  >
                    {item.step}
                  </motion.div>
                  <div className="inline-block bg-teal/10 text-teal font-bold px-3 py-1 rounded-full text-xs mb-4 uppercase tracking-wide">
                    {item.tag}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-navy">{item.title}</h3>
                  <p className="text-navy/80 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 8) NICHO / SECTORES */}
        <section id="sectores" className="py-24 px-6 max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-16 max-w-2xl text-navy">
              Negocios locales que modernizan su <span className="text-teal">atención y visibilidad.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FadeUp delay={0.1}>
              <CardSpotlight className="border border-border h-full">
                <div className="p-8 bg-white text-center md:text-left h-full">
                  <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mx-auto md:mx-0 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-navy">Salud y Belleza</h3>
                  <p className="text-navy/80 font-medium">Spas, clínicas estéticas, barberías y salones de belleza. Reservas más fáciles para tus clientes y control claro de agendas.</p>
                </div>
              </CardSpotlight>
            </FadeUp>
            <FadeUp delay={0.2}>
              <CardSpotlight className="border border-border h-full">
                <div className="p-8 bg-white text-center md:text-left h-full">
                  <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mx-auto md:mx-0 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-navy">Servicios Profesionales</h3>
                  <p className="text-navy/80 font-medium">Consultorios médicos, dentistas, terapeutas y asesores locales. Citas en orden y recordatorios para que no lo olviden.</p>
                </div>
              </CardSpotlight>
            </FadeUp>
            <FadeUp delay={0.3}>
              <CardSpotlight className="border border-border h-full">
                <div className="p-8 bg-white text-center md:text-left h-full">
                  <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mx-auto md:mx-0 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-navy">Especialidades locales</h3>
                  <p className="text-navy/80 font-medium">Estudios de tatuaje, detallado automotriz, gimnasios boutique y entrenadores. Imagen profesional y reservas fluidas.</p>
                </div>
              </CardSpotlight>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <div className="p-8 bg-teal text-white rounded-3xl text-center shadow-lg shadow-teal/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal/0 via-white/10 to-teal/0 w-[200%] translate-x-[-100%] animate-[shimmer_3s_infinite]" />
              <p className="text-lg font-medium leading-relaxed max-w-3xl mx-auto relative z-10">
                ¿Tu negocio no está aquí pero agendas citas, recibes opiniones y atiendes de forma local? El sistema funciona exactamente igual. Nosotros nos encargamos de adaptarlo por ti.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* 9) CTA FINAL */}
        <section className="py-32 px-6 text-center max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal/10 blur-[150px] rounded-full pointer-events-none -z-10" />
          
          <FadeUp>
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-navy">
              Te mostramos en 10 minutos qué está mal en tu Google, WhatsApp y reservas.
            </h2>
            <div className="mb-12 max-w-2xl mx-auto">
              <ScrollRevealText 
                text="Revisamos a detalle tus reseñas actuales, competencia local, enlaces digitales, horarios, imágenes y la experiencia general de tus clientes. Sin compromisos de venta." 
                className="text-lg md:text-xl text-navy/95 font-medium justify-center text-center"
              />
            </div>
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(17,124,138,0.3)" }}
              whileTap={{ scale: 0.95 }}
              href={generateWaLink("Hola, quiero mi diagnóstico gratuito de 10 minutos para mi negocio local.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white px-10 py-5 rounded-full font-bold text-xl transition-colors hover:bg-teal w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Solicitar diagnóstico gratuito
            </motion.a>
          </FadeUp>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-border bg-white text-navy/80 font-medium text-sm relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logotipo.png" alt="Venttia" width={100} height={30} className="h-6 w-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all mix-blend-multiply" />
            <span>· Organización Digital Local · 2026</span>
          </div>
          <div className="flex gap-8">
            <a href={generateWaLink("Hola!")} target="_blank" rel="noreferrer" className="hover:text-teal transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-teal transition-colors">Instagram</a>
            <a href="#" className="hover:text-teal transition-colors">Aviso de privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
