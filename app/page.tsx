"use client";
import './globals.css'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronRight, Menu, X, Sparkles, Rocket, Star, Play, Mail, Phone, Instagram, Github, Globe } from "lucide-react";
import Link from 'next/link';


const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const useParallax = (offset: [number, number] = [0, 1], output: [number, number] = [0, 100]) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, offset, output);
  return { ref, y };
};

const Magnetic = ({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate(${relX * strength * 20}px, ${relY * strength * 20}px)`;
    };
    const onLeave = () => (el.style.transform = "translate(0,0)");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <div ref={ref} className="inline-block will-change-transform">{children}</div>;
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <div className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
      <Section className="flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2 font-semibold">
          {/* Replace with your logo image */}
          <img 
            src="/logo.png" 
            alt="Foton Labz Logo" 
            className="h-6 w-6 object-contain" 
          />
          <span>Foton Labz</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative text-sm font-medium group">
              {l.label}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 bg-black transition-all group-hover:scale-x-100" />
            </a>
          ))}
          <Magnetic><Button variant="glass" className="rounded-2xl">Contact</Button></Magnetic>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Section>
      {open && (
        <div className="md:hidden border-t border-white/10 glass">
          <Section className="py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-base py-1" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <Button variant="glass" className="w-full rounded-2xl">Contact</Button>
          </Section>
        </div>
      )}
    </div>
  );
};


const Hero = () => {
  const { ref, y } = useParallax([0, 1], [0, 80]);
  return (
    <Section id="home" className="pt-28 pb-24">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Your <span className="text-gradient-fixed"> Vision </span>Engineered with <span className="text-gradient-fixed">precision.</span> 
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.15, duration: 0.6 }} 
            className="mt-5 text-lg text-gray-600"
          >
            Where Ideas Meet Embedded Excellence.
          </motion.p>
          <div className="mt-8 flex items-center gap-3">
            <Magnetic><Button className="rounded-2xl">Get Started <ChevronRight className="ml-1 h-4 w-4" /></Button></Magnetic>
            <Button variant="outline" className="rounded-2xl"><Play className="mr-2 h-4 w-4" /> Watch Demo</Button>
          </div>
          <div className="mt-10"><Marquee /></div>
        </div>
        <div className="lg:col-span-5 relative">
          <motion.div ref={ref as any} style={{ y }} className="aspect-[4/5] w-full rounded-3xl glass overflow-hidden">
            <GridOrbs />
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

const GridOrbs = () => {
  const dots = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 grid grid-cols-6 opacity-20">
        {dots.map((d) => (<motion.div key={d} className="border-r border-b border-white/20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} />))}
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="absolute inset-6 rounded-3xl glass flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="h-40 w-40 rounded-full border-4 border-white/20 flex items-center justify-center">
          <Rocket className="h-10 w-10" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Marquee = () => {
  const items = ["React", "Framer Motion", "Tailwind", "Accessibility", "Performance", "TypeScript", "Vercel", "Clean UI"];
  return (
    <div className="overflow-hidden whitespace-nowrap border rounded-2xl py-2">
      <motion.div initial={{ x: 0 }} animate={{ x: [0, -600] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} className="inline-flex gap-8 px-4">
        {items.concat(items).map((it, i) => (<span key={i} className="inline-flex items-center gap-2 text-sm font-medium"><Star className="h-4 w-4" /> {it}</span>))}
      </motion.div>
    </div>
  );
};

const Feature = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-50px" });
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 20, scale: 0.70 }} 
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} 
      transition={{ duration: 0.5 }} 
      className="h-full flex"
    >
      <Card className="rounded-3xl shadow-sm h-full flex flex-col min-h-[23 0px] w-full"> {/* Added w-full and increased min-height */}
        <CardHeader className="flex-shrink-0"> {/* Prevent header from growing */}
          <CardTitle className="flex items-center gap-2 text-xl">
            <Icon className="h-5 w-5" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600 flex-grow flex flex-col">
          <p className="flex-grow">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Features = () => (
  <Section id="features" className="py-20">
    <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
      Our promise
    </motion.h2>
    <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">IoT Solutions Designed for Today, Ready for Tomorrow.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <Feature icon={Sparkles} title="Precision Engineering" desc="Every circuit and line of code built with unmatched accuracy, ensuring reliable performance." />
      <Feature icon={Rocket} title="Performance-Driven" desc="Optimized firmware and hardware that deliver speed, stability, and efficiency." />
      <Feature icon={Star} title="Smart Design" desc="User-friendly dashboards, clean interfaces, and intuitive interactions for every solution." />
      <Feature icon={Globe} title="Scalable & Responsive" desc="From small devices to enterprise systems — our solutions adapt seamlessly." />
      <Feature icon={Mail} title="Always Connected" desc="IoT-ready platforms with API, cloud, and mobile integrations tailored to your needs." />
      <Feature icon={Github} title="Developer-Ready" desc="Clean documentation, modular builds, and easy upgrades for future improvements." />
    </div>
  </Section>
);

const ScribbleUnderline = () => (
  <motion.svg initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} viewport={{ once: true }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 20" className="absolute left-0 bottom-0 w-full h-5">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff7e29" />
        <stop offset="100%" stopColor="#ffb347" />
      </linearGradient>
    </defs>
    <motion.path d="M5 15 Q 50 5, 100 15 T 195 15" fill="transparent" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
  </motion.svg>
);

const ProjectCard = ({ title, tag, i, id }: { title: string; tag: string; i: number; id: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ delay: i * 0.06 }} 
    className="group rounded-3xl overflow-hidden glass hover-lift"
  >
    <Link href={`/project/${id}`}>
      <div className="aspect-[16/10] bg-gradient-to-br from-orange-100/30 to-blue-100/30" />
      <div className="p-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600">{tag}</p>
        </div>
        <motion.div whileHover={{ x: 6 }}>
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      </div>
    </Link>
  </motion.div>
);

const Work = () => {
  const projects = [
    { id: "product-microsite", title: "Product Microsite", tag: "Launch page" },
    { id: "portfolio", title: "Portfolio", tag: "Case studies" },
    { id: "saas-landing", title: "SaaS Landing", tag: "Conversion focused" },
    { id: "mobile-app-site", title: "Mobile App Site", tag: "Feature highlights" },
    { id: "agency-site", title: "Agency Site", tag: "Services + blog" },
    { id: "docs", title: "Docs", tag: "Knowledge base" },
  ];
  
  return (
    <Section id="work" className="py-20">
      <div className="flex flex-col items-center gap-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 relative inline-block">
          Transform your dreams into <span className="relative inline-block text-gray-800">reality!<ScribbleUnderline /></span>
        </h2>
        <p className="text-gray-600 mt-2">A mix of product sites and creative experiments.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} id={p.id} title={p.title} tag={p.tag} i={i} />
        ))}
      </div>
    </Section>
  );
};

const TestimonialCarousel = () => {
  const items = [
    { quote: "The motion feels delightful without getting in the way.", name: "Ava M.", role: "Product Designer" },
    { quote: "Clean code, clean UI, and fast to ship.", name: "Noah R.", role: "Frontend Engineer" },
    { quote: "We launched in days, not weeks.", name: "Leah S.", role: "Founder" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 4200); return () => clearInterval(id); }, []);
  return (
    <Section className="py-20">
      <Card className="rounded-3xl">
        <CardContent className="p-8 relative z-10">
          <motion.blockquote key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center text-xl sm:text-2xl font-medium text-gray-800">
            “{items[idx].quote}”
            <footer className="mt-4 text-base text-gray-600">— {items[idx].name}, {items[idx].role}</footer>
          </motion.blockquote>
        </CardContent>
      </Card>
    </Section>
  );
};

const About = () => (
  <Section id="about" className="py-20">
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">About the studio</h2>
        <p className="mt-4 text-gray-600">We design and build custom embedded systems and IoT solutions tailored to your needs. From prototypes to production-ready devices, we focus on precision, innovation, and timely delivery — ensuring your ideas become powerful, reliable products.</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Stat n="120+" label="Projects shipped" />
          <Stat n="4.9/5" label="Client rating" />
          <Stat n="<2 weeks" label="Prototype delivery time" />
          <Stat n="24/7" label="Support for all projects" />
        </div>
      </div>
      <div className="rounded-3xl glass overflow-hidden">
        <div className="aspect-[16/10] bg-gradient-to-br from-white/10 via-blue-50/20 to-orange-50/20" />
        <div className="p-6 relative z-10">
          <ul className="space-y-2 text-gray-700">
            <li>• Expertise in Embedded Systems, IoT, and Smart Automation</li>
            <li>• End-to-End Development — from PCB to cloud dashboards</li>
            <li>• Integration with sensors, wireless modules, and mobile apps</li>
            <li>• On-time delivery with continuous improvements</li>
            <li>• Tailored hardware + software solutions for all needs.</li>
          </ul>
        </div>
      </div>
    </div>
  </Section>
);

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div className="rounded-2xl glass p-5 hover-lift">
    <div className="text-2xl font-bold">{n}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const FAQ = () => (
  <Section id="faq" className="py-20">
    <h2 className="text-3xl sm:text-4xl font-bold text-center">FAQ</h2>
    <p className="text-center text-gray-600 mt-2">Answers to common questions.</p>
    <div className="max-w-3xl mx-auto mt-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger data-parent="item-1">Can you clone another site exactly?</AccordionTrigger>
          <AccordionContent data-value="item-1">No—we create original work and avoid copying others' proprietary layouts, text, or media. We can match vibes and interactions.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger data-parent="item-2">How customizable is this template?</AccordionTrigger>
          <AccordionContent data-value="item-2">Fully. Swap colors, type, content, sections, and motion presets. Add routes or connect a CMS.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger data-parent="item-3">What stack do you use?</AccordionTrigger>
          <AccordionContent data-value="item-3">React + Tailwind + Framer Motion. Deploy anywhere.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </Section>
);

const CTA = () => (
  <Section className="py-20">
    <div className="rounded-3xl p-8 sm:p-12 glass border border-white/20 relative">
      {/* Add relative positioning and z-index to text elements */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between relative z-10">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">Ready to ship something great?</h3>
          <p className="text-gray-600 mt-2">Tell us about your project—timeline, goals, and vibe.</p>
        </div>
        <form className="flex gap-3 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
          <Input type="email" placeholder="you@example.com" className="bg-white/80 text-gray-800 rounded-2xl" />
          <Button className="rounded-2xl">Get in touch</Button>
        </form>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-white/20">
    <Section className="py-10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between relative z-10">
      <div className="text-sm text-gray-600">© {new Date().getFullYear()} Foton Studio. All rights reserved.</div>
      <div className="flex items-center gap-4">
        <a href="#" aria-label="Email" className="text-gray-600 hover:text-gray-800"><Mail className="h-5 w-5" /></a>
        <a href="#" aria-label="Phone" className="text-gray-600 hover:text-gray-800"><Phone className="h-5 w-5" /></a>
        <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-800"><Instagram className="h-5 w-5" /></a>
        <a href="#" aria-label="GitHub" className="text-gray-600 hover:text-gray-800"><Github className="h-5 w-5" /></a>
      </div>
    </Section>
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-orange-50/30 text-black selection:bg-blue-200/50">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Work />
        <TestimonialCarousel />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}