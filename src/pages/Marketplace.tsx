import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lock, Clock, MapPin, Users, Calendar, Search, ArrowRight, X, School, BookOpen, Sprout, Award, Globe, Cpu, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import heroSwedenPrincipals from "@/assets/hero-sweden-principals.jpg";
import usaProgram from "@/assets/usa-program.jpg";
import finlandProgram from "@/assets/finland-program.jpg";
import galleryUsaCampus from "@/assets/gallery-usa-campus.jpg";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScN5mmD4pc1A6DVLuaRrrOESMqH7EcFmdHNXwHAvq2_VzmGjw/viewform?embedded=true";

type ProgramStatus = "open" | "closed";

interface Program {
  id: string;
  title: string;
  hostSchool: string;
  country: string;
  flag: string;
  type: "student" | "teacher" | "both" | "principal";
  duration: string;
  dates: string;
  slots: number;
  slotsRemaining: number;
  status: ProgramStatus;
  description: string;
  facilities: string[];
  image: string;
}

const programs: Program[] = [
  {
    id: "1",
    title: "Global Immersive Program for School Leaders",
    hostSchool: "Leading American K–12 Institutions",
    country: "United States",
    flag: "🇺🇸",
    type: "principal",
    duration: "7 Days",
    dates: "March 2026",
    slots: 30,
    slotsRemaining: 0,
    status: "closed",
    description: "An extraordinary cohort of Indian school leaders visited leading American K–12 institutions, experiencing innovative pedagogy, technology integration, and high-performance school culture.",
    facilities: ["School Visits", "Leadership Workshops", "Networking"],
    image: usaProgram,
  },
  {
    id: "2",
    title: "Global Immersive Program for School Leaders",
    hostSchool: "Top Swedish Schools, Stockholm",
    country: "Sweden",
    flag: "🇸🇪",
    type: "principal",
    duration: "7 Days",
    dates: "16–23 May 2027",
    slots: 30,
    slotsRemaining: 15,
    status: "open",
    description: "Immerse yourself in Sweden's globally acclaimed education model — known for student wellbeing, critical thinking, and fearless innovation. Return with frameworks to transform your school.",
    facilities: ["School Immersions", "AI & EdTech", "Certification"],
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    title: "International Student Cultural Exchange",
    hostSchool: "Partner Schools Network",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "student",
    duration: "7 Days",
    dates: "July 2026",
    slots: 40,
    slotsRemaining: 0,
    status: "closed",
    description: "A curated cultural immersion for students to experience the British education system, visit historic institutions, and build cross-cultural friendships.",
    facilities: ["School Visits", "Cultural Tours", "Homestay"],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop",
  },
  {
    id: "4",
    title: "Teacher Professional Development Exchange",
    hostSchool: "Finnish Education Centres",
    country: "Finland",
    flag: "🇫🇮",
    type: "teacher",
    duration: "7 Days",
    dates: "September 2026",
    slots: 25,
    slotsRemaining: 0,
    status: "closed",
    description: "An immersive professional development program for teachers to explore Finland's world-leading education practices, classroom innovation, and teacher autonomy models.",
    facilities: ["Classroom Observations", "Workshops", "Certification"],
    image: finlandProgram,
  },
  {
    id: "5",
    title: "STEM & Innovation Exchange for Students",
    hostSchool: "Singapore STEM Academies",
    country: "Singapore",
    flag: "🇸🇬",
    type: "student",
    duration: "7 Days",
    dates: "December 2026",
    slots: 35,
    slotsRemaining: 0,
    status: "closed",
    description: "Students explore Singapore's cutting-edge STEM education ecosystem, visit innovation labs, and collaborate with Singaporean students on real-world projects.",
    facilities: ["STEM Labs", "Innovation Hubs", "Project Collaboration"],
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=500&fit=crop",
  },
];

const marqueeItems = [
  "School Visits", "Leadership Workshops", "Swedish EdTech Immersion",
  "Global Principal Network", "NEP 2020 Alignment Sessions", "Stockholm City Experience",
  "AI in Education Masterclass",
];

const galleryImages = [
  { src: galleryUsaCampus, caption: "Indian school leaders at USA school campus" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", caption: "Knowledge exchange session with US educators" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop", caption: "Witnessing American school culture firsthand" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", caption: "Evening networking with global education leaders" },
  { src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop", caption: "Interactive leadership masterclass" },
];

const pillars = [
  { icon: School, title: "Live School Immersions", desc: "Walk the corridors of Sweden's top-performing schools. Observe classes, meet teachers, and talk directly with principals." },
  { icon: Cpu, title: "AI & EdTech Masterclasses", desc: "Exclusive sessions on Sweden's approach to EdTech, AI in education, and how it aligns with India's NEP 2020 framework." },
  { icon: Globe, title: "Global Principal Network", desc: "Build lasting relationships with school leaders from across India and around the world — a network that continues beyond the trip." },
  { icon: Target, title: "Implementation Playbook", desc: "Leave with a personal action plan — concrete ideas, frameworks, and tools ready to implement in your school from Day 1." },
  { icon: Trophy, title: "AceEdX Certification", desc: "Receive an internationally recognised AceEdX Global Leadership Certificate upon program completion." },
];

const stats = [
  { value: "#1", label: "PISA rankings for student wellbeing & autonomy" },
  { value: "100%", label: "Digital integration in Swedish classrooms" },
  { value: "2+", label: "World-class school visits in 7 days" },
  { value: "6", label: "Principals in your cohort" },
];

const eligibility = [
  { icon: School, title: "School Principals", desc: "K–12 principals from private schools across India who lead teams of 20+ and are committed to school improvement." },
  { icon: BookOpen, title: "Vice Principals & Academic Heads", desc: "Senior academic leaders shaping curriculum, culture, and teacher development in their institutions." },
  { icon: Sprout, title: "School Owners & Trustees", desc: "Visionary school founders and management committee members with strategic authority to drive change." },
];

const testimonials = [
  {
    quote: "The USA Program completely changed how I think about running a school. I came back with 20 ideas I could implement immediately — and a network of principals across the world who feel like family.",
    name: "Principal Meena Sharma",
    role: "Delhi Public School — USA Program, March 2026 Cohort",
  },
  {
    quote: "As a teacher, experiencing the Finnish classroom model firsthand was transformative. The emphasis on student autonomy and creative thinking gave me tools I use every single day now.",
    name: "Ravi Krishnan",
    role: "Senior Science Teacher — Finland Program, 2025 Cohort",
  },
  {
    quote: "The Singapore STEM exchange opened my eyes to what's possible. Collaborating with students from another country on real projects taught me more than any textbook ever could.",
    name: "Ananya Desai",
    role: "Class 11 Student — Singapore Exchange, 2025 Cohort",
  },
  {
    quote: "I was hesitant at first, but the UK cultural exchange was the best decision for my school. Our teachers returned with fresh perspectives on inclusive education that we've since embedded into our curriculum.",
    name: "Dr. Pradeep Nair",
    role: "Principal, Greenfield International School — UK Program, 2025 Cohort",
  },
  {
    quote: "The networking alone was worth it. I connected with principals from 8 different Indian states and 3 countries. We still meet monthly to share ideas and hold each other accountable.",
    name: "Sunita Bhatt",
    role: "Vice Principal, Modern Academy — USA Program, March 2026 Cohort",
  },
];

/* ── Program Card ── */
const ProgramCard = ({ program, onApply }: { program: Program; index: number; onApply: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={program.image}
        alt={program.country}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute top-4 right-4">
        <Badge className={program.status === "open"
          ? "bg-green-500/90 text-white border-green-600 animate-pulse-green"
          : "bg-red-500/90 text-white border-red-600"
        }>
          ● {program.status === "open" ? "Open Now" : "Closed"}
        </Badge>
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="text-white font-display text-2xl font-semibold drop-shadow-lg">
          {program.country} {program.flag}
        </span>
      </div>
    </div>

    <div className="p-6">
      <p className="text-xs text-primary tracking-widest uppercase mb-2 font-semibold">{program.title}</p>

      <div className="flex gap-6 mb-4 text-sm">
        <div className="text-muted-foreground">
          <span className="block text-foreground font-medium">{program.dates}</span>When
        </div>
        <div className="text-muted-foreground">
          <span className="block text-foreground font-medium">
            {program.status === "open" ? "Seats Filling Fast" : "Fully Booked"}
          </span>Status
        </div>
        <div className="text-muted-foreground">
          <span className="block text-foreground font-medium">{program.duration}</span>Duration
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-5 line-clamp-3">{program.description}</p>

      {program.status === "open" ? (
        <Button onClick={onApply} className="w-full gradient-primary text-white border-0">
          Register My Interest <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      ) : (
        <Button disabled className="w-full">
          Application Closed
        </Button>
      )}
    </div>
  </motion.div>
);

/* ── Main Page ── */
const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered = programs.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()) ||
      p.hostSchool.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || p.type === typeFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 overflow-hidden gradient-hero">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs tracking-[0.25em] uppercase text-primary font-medium">STOCKHOLM, SWEDEN · 16–23 MAY 2027</span>
                <span className="w-8 h-px bg-primary/50" />
                <Badge className="bg-green-500/90 text-white border-green-600 animate-pulse-green text-xs">Now Open</Badge>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6 text-foreground">
                International Exchange<br />Programs for<br />
                <em className="text-primary italic font-normal">Schools Worldwide</em>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mb-8 font-sans">
                Trusted, curated international exchange programs for Principals, School Owners, Vice Principals.
                Experience world-class education systems and bring transformative ideas back to your school.
              </p>

              <div className="flex gap-8 mb-8">
                <div><span className="block text-xs tracking-widest uppercase text-muted-foreground">Next Program</span><span className="font-display text-xl text-primary font-semibold">STOCKHOLM 🇸🇪</span></div>
                <div><span className="block text-xs tracking-widest uppercase text-muted-foreground">When</span><span className="font-display text-xl text-primary font-semibold">16–23 May 2027</span></div>
                <div><span className="block text-xs tracking-widest uppercase text-muted-foreground">Seats</span><span className="font-display text-xl text-primary font-semibold">Limited</span></div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-red-100 text-red-600 border-red-200">🇺🇸 USA March 2026 — Closed</Badge>
                <Badge className="bg-green-100 text-green-700 border-green-300 animate-pulse-green">🇸🇪 Sweden May 2027 — Open</Badge>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setFormOpen(true)} className="gradient-primary text-white border-0 shadow-glow px-8 py-6 text-base">
                  Register My Interest <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary px-6 py-6" asChild>
                  <a href="#programs">View All Programs</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img src={heroSwedenPrincipals} alt="School principals on the AceEdX Sweden program in Stockholm" width={1024} height={1024} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-xs font-semibold tracking-widest uppercase text-primary-foreground flex items-center gap-3 flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── PROGRAMS SECTION ── */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">AceEdX International Exchange</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
              Our <em className="text-primary italic">Exchange Programs</em>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto font-sans text-sm">
              Trusted programs for principals, teachers, and students — designed to build global perspectives and transform education.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search programs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="both">Both</SelectItem>
                <SelectItem value="principal">For Principals</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">🔓 Open</SelectItem>
                <SelectItem value="closed">⏳ Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground"><p className="text-lg">No programs found matching your criteria.</p></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((p, i) => (
                <ProgramCard key={p.id} program={p} index={i} onApply={() => setFormOpen(true)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 text-center">From Our Previous Program</p>
          <h2 className="font-display text-3xl font-light text-center text-foreground">Real Moments from the <em className="text-primary italic">USA Program</em></h2>
        </div>
        <div ref={galleryRef} className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {galleryImages.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[380px]">
              <div className="rounded-lg overflow-hidden border border-border h-[250px] hover:scale-[1.02] transition-transform shadow-sm">
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-xs tracking-wider uppercase text-muted-foreground mt-2">{img.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SWEDEN ── */}
      <section id="why-sweden" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display text-[18rem] font-bold text-foreground/[0.03] tracking-widest">SWEDEN</span>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto relative z-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Why Sweden</p>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-6 text-foreground">
                Where the World's Best<br /><em className="text-primary italic">Education Happens</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 font-sans">
                Sweden consistently ranks among the world's top education systems — not for rote learning,
                but for deep thinking, student agency, and future-ready skills. Every school you visit will
                challenge the way you lead.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="p-5 border border-border rounded-lg bg-card hover:border-primary transition-colors shadow-sm">
                    <span className="font-display text-3xl font-light text-primary">{s.value}</span>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-lg hover:bg-primary/5 transition-colors border border-transparent hover:border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1 font-sans">{p.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section id="eligibility" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Eligibility</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
              Is This <em className="text-primary italic">For You?</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {eligibility.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-xl border border-border bg-background hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 transition-colors">
                  <e.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground mb-2">{e.title}</h4>
                <p className="text-sm text-muted-foreground font-sans">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04] border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">What They Say</p>
            <h2 className="font-display text-3xl font-light text-foreground">
              Voices from Our <em className="text-primary italic">Programs</em>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <span className="font-display text-8xl text-primary/30 leading-none">"</span>
            <blockquote className="font-display italic text-xl md:text-2xl font-light max-w-3xl mx-auto mb-6 text-foreground leading-relaxed">
              {testimonials[activeTestimonial].quote}
            </blockquote>
            <div className="text-sm text-muted-foreground mb-8">
              <strong className="block text-foreground text-base">{testimonials[activeTestimonial].name}</strong>
              {testimonials[activeTestimonial].role}
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? "bg-primary scale-110" : "bg-border hover:bg-muted-foreground/40"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section id="register" className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(210_100%_40%/0.08),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Helsingborg, Sweden · 16–23 May 2027</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6 text-foreground">
            Seats Are Filling Fast.<br />
            <em className="text-primary italic">Don't Miss Your Spot.</em>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 font-sans">
            This is the most exclusive global leadership experience for Indian school principals.
            The Sweden cohort is small by design — every seat matters.
          </p>
          <Badge className="bg-green-100 text-green-700 border-green-300 animate-pulse-green text-sm px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 inline-block animate-ping" />
            Registration Now Open — Limited Seats
          </Badge>
          <div>
            <Button
              onClick={() => setFormOpen(true)}
              className="gradient-primary text-white border-0 shadow-glow text-base px-10 py-7 text-lg"
            >
              Register My Interest for Sweden 2027
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No commitment required at this stage · We'll reach out with full details & pricing</p>
        </div>
      </section>

      <Footer />

      {/* ── GOOGLE FORM MODAL ── */}
      <Dialog open={formOpen} onOpenChange={(o) => { setFormOpen(o); if (!o) setFormSubmitted(false); }}>
        <DialogContent className="sm:max-w-[680px] p-0 bg-card border-border overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="font-display text-2xl">May 16th to 23rd 2027 🇸🇪</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Global Immersive Program for School Leaders · Stockholm, Sweden
            </DialogDescription>
          </DialogHeader>
          {formSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <h3 className="font-display text-xl">Thank you for registering!</h3>
              <p className="text-sm text-muted-foreground">
                Your details have been received. View the full program brochure below.
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer">
                  View Program Brochure <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          ) : (
            <>
              <iframe
                src={GOOGLE_FORM_URL}
                className="w-full h-[520px] border-0 bg-white"
                title="Registration Form"
                onLoad={() => {
                  if (formLoadedOnce.current) setFormSubmitted(true);
                  formLoadedOnce.current = true;
                }}
              />
              <div className="p-4 border-t border-border text-center">
                <a
                  href={BROCHURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Already submitted? View the brochure →
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Marketplace;
