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

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfkDPxPz5ZK_X2o_-zcrhXNMdBKf6eE4eFjk6WhCLN3jXZ-qw/viewform?embedded=true";

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
    dates: "August 2026",
    slots: 30,
    slotsRemaining: 0,
    status: "closed",
    description: "An extraordinary cohort of Indian school leaders visited leading American K–12 institutions, experiencing innovative pedagogy, technology integration, and high-performance school culture.",
    facilities: ["School Visits", "Leadership Workshops", "Networking"],
  },
  {
    id: "2",
    title: "Global Immersive Program for School Leaders",
    hostSchool: "Top Swedish Schools, Helsingborg",
    country: "Sweden",
    flag: "🇸🇪",
    type: "principal",
    duration: "7 Days",
    dates: "November 2026",
    slots: 30,
    slotsRemaining: 15,
    status: "open",
    description: "Immerse yourself in Sweden's globally acclaimed education model — known for student wellbeing, critical thinking, and fearless innovation. Return with frameworks to transform your school.",
    facilities: ["School Immersions", "AI & EdTech", "Certification"],
  },
];

const marqueeItems = [
  "School Visits", "Leadership Workshops", "Swedish EdTech Immersion",
  "Global Principal Network", "NEP 2020 Alignment Sessions", "Helsingborg City Experience",
  "AI in Education Masterclass",
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop", caption: "Indian school leaders at USA school campus" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", caption: "Knowledge exchange session with US educators" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop", caption: "Witnessing American school culture firsthand" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", caption: "Evening networking with global education leaders" },
  { src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop", caption: "Interactive leadership masterclass" },
];

const itinerary = [
  { day: "1", label: "Day 1 · Arrival", title: "Welcome to Helsingborg", desc: "Arrive in Helsingborg, check in to your curated accommodation, orientation dinner with the full cohort, and a welcome briefing on Sweden's education philosophy." },
  { day: "2", label: "Days 2–3 · School Visits", title: "Inside Sweden's Classrooms", desc: "Full-day immersive visits to 2–3 high-performing Swedish schools. Observe project-based learning, meet teachers and students, and exchange ideas with host principals." },
  { day: "3", label: "Day 4 · EdTech & AI", title: "AI, Technology & The Future of School", desc: "Exclusive sessions at a Swedish EdTech hub. Explore how AI is transforming curriculum delivery, teacher support, and student analytics." },
  { day: "4", label: "Day 5 · Leadership Masterclass", title: "Leading for the Future", desc: "An intensive leadership workshop on school transformation, change management, and building high-performance school cultures — facilitated by expert educators." },
  { day: "5", label: "Days 6–7 · Synthesis & Farewell", title: "Your Action Plan & Celebration", desc: "Guided reflection sessions to build your personal school transformation plan. Farewell gala dinner, certificate ceremony, and departure with a renewed vision." },
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
  { value: "5+", label: "World-class school visits in 7 days" },
  { value: "30+", label: "Principal peers in your cohort" },
];

const eligibility = [
  { icon: School, title: "School Principals", desc: "K–12 principals from private schools across India who lead teams of 20+ and are committed to school improvement." },
  { icon: BookOpen, title: "Vice Principals & Academic Heads", desc: "Senior academic leaders shaping curriculum, culture, and teacher development in their institutions." },
  { icon: Sprout, title: "School Owners & Trustees", desc: "Visionary school founders and management committee members with strategic authority to drive change." },
];

/* ── Program Card ── */
const ProgramCard = ({ program, onApply }: { program: Program; index: number; onApply: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={program.id === "1"
          ? "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=500&fit=crop"
          : "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=500&fit=crop"}
        alt={program.country}
        className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
      <div className="absolute top-4 right-4">
        <Badge className={program.status === "open"
          ? "bg-green-500/20 text-green-400 border-green-500/30 animate-pulse-green"
          : "bg-destructive/20 text-destructive border-destructive/30"
        }>
          ● {program.status === "open" ? "Open Now" : "Closed"}
        </Badge>
      </div>
    </div>

    <div className="p-6">
      <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
        {program.country} {program.flag}
      </h3>
      <p className="text-xs text-primary tracking-widest uppercase mb-4">{program.title}</p>

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
        <Button onClick={onApply} className="w-full gradient-primary text-primary-foreground border-0">
          Register My Interest <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      ) : (
        <Button disabled className="w-full bg-muted text-muted-foreground border-border">
          Registration Closed
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
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs tracking-[0.25em] uppercase text-primary font-medium">Sweden · November 2026</span>
              <span className="w-8 h-px bg-primary/50" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse-green text-xs">Now Open</Badge>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
              Global Immersive<br />Program for<br />
              <em className="text-primary italic font-normal">School Leaders</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mb-8 font-sans">
              An exclusive, transformative journey for K–12 school principals — experience Sweden's
              world-renowned education system, build global networks, and bring back a new vision for your school.
            </p>

            <div className="flex gap-8 mb-8">
              <div><span className="block text-xs tracking-widest uppercase text-muted-foreground">Destination</span><span className="font-display text-xl text-primary font-semibold">Helsingborg 🇸🇪</span></div>
              <div><span className="block text-xs tracking-widest uppercase text-muted-foreground">When</span><span className="font-display text-xl text-primary font-semibold">November 2026</span></div>
              <div><span className="block text-xs tracking-widest uppercase text-muted-foreground">Seats</span><span className="font-display text-xl text-primary font-semibold">Limited</span></div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-destructive/15 text-destructive border-destructive/30">🇺🇸 USA August 2026 — Closed</Badge>
              <Badge className="bg-green-500/15 text-green-400 border-green-500/30 animate-pulse-green">🇸🇪 Sweden Nov 2026 — Open</Badge>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setFormOpen(true)} className="gradient-primary text-primary-foreground border-0 shadow-glow px-8 py-6 text-base">
                Register My Interest <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary px-6 py-6" asChild>
                <a href="#programs">Learn More</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
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
            <h2 className="font-display text-3xl md:text-4xl font-light">
              Our 2026 <em className="text-primary italic">Exchange Programs</em>
            </h2>
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
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {filtered.map((p, i) => (
                <ProgramCard key={p.id} program={p} index={i} onApply={() => setFormOpen(true)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 text-center">From Our Previous Program</p>
          <h2 className="font-display text-3xl font-light text-center">Real Moments from the <em className="text-primary italic">USA Program</em></h2>
        </div>
        <div ref={galleryRef} className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {galleryImages.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[380px]">
              <div className="rounded-lg overflow-hidden border border-border h-[250px] hover:scale-[1.02] transition-transform">
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover brightness-[0.85]" loading="lazy" />
              </div>
              <p className="text-xs tracking-wider uppercase text-muted-foreground mt-2">{img.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SWEDEN ── */}
      <section id="why-sweden" className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display text-[18rem] font-bold text-foreground/[0.015] tracking-widest">SWEDEN</span>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto relative z-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Why Sweden</p>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-6">
                Where the World's Best<br /><em className="text-primary italic">Education Happens</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 font-sans">
                Sweden consistently ranks among the world's top education systems — not for rote learning,
                but for deep thinking, student agency, and future-ready skills. Every school you visit will
                challenge the way you lead.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="p-5 border border-border rounded-lg bg-background/50 hover:border-primary transition-colors">
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

      {/* ── ITINERARY ── */}
      <section id="itinerary" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Sample Program Flow</p>
            <h2 className="font-display text-3xl md:text-4xl font-light">
              Your 7-Day Journey in <em className="text-primary italic">Helsingborg</em>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent" />
            {itinerary.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-[0.6rem] font-bold text-primary-foreground">
                  {item.day}
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-primary mb-1">{item.label}</p>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section id="eligibility" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Eligibility</p>
            <h2 className="font-display text-3xl md:text-4xl font-light">
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
                className="text-center p-8 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
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

      {/* ── TESTIMONIAL ── */}
      <section className="py-16 bg-gradient-to-br from-primary/[0.08] to-secondary/[0.06] border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <span className="font-display text-8xl text-primary/30 leading-none">"</span>
          <blockquote className="font-display italic text-xl md:text-2xl font-light max-w-3xl mx-auto mb-6 text-accent leading-relaxed">
            The USA Program completely changed how I think about running a school. I came back with 20 ideas I could
            implement immediately — and a network of principals across the world who feel like family.
          </blockquote>
          <div className="text-sm text-muted-foreground">
            <strong className="block text-foreground text-base">Principal Meena Sharma</strong>
            Delhi Public School — USA Program, August 2026 Cohort
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section id="register" className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(204_100%_33%/0.15),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Helsingborg, Sweden · November 2026</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
            Seats Are Filling Fast.<br />
            <em className="text-primary italic">Don't Miss Your Spot.</em>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 font-sans">
            This is the most exclusive global leadership experience for Indian school principals.
            The Sweden cohort is small by design — every seat matters.
          </p>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30 animate-pulse-green text-sm px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2 inline-block animate-ping" />
            Registration Now Open — Limited Seats
          </Badge>
          <div>
            <Button
              onClick={() => setFormOpen(true)}
              className="gradient-primary text-primary-foreground border-0 shadow-glow text-base px-10 py-7 text-lg"
            >
              Register My Interest for Sweden 2026
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No commitment required at this stage · We'll reach out with full details & pricing</p>
        </div>
      </section>

      <Footer />

      {/* ── GOOGLE FORM MODAL ── */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[680px] p-0 bg-card border-border overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="font-display text-2xl">Register for Sweden 2026 🇸🇪</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Global Immersive Program for School Leaders · November 2026
            </DialogDescription>
          </DialogHeader>
          <iframe
            src={GOOGLE_FORM_URL}
            className="w-full h-[520px] border-0 bg-white"
            title="Registration Form"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
