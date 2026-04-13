import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Unlock, Clock, MapPin, Users, Calendar, Search, BookmarkPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

type ProgramStatus = "open" | "closed" | "locked";

interface Program {
  id: string;
  title: string;
  hostSchool: string;
  country: string;
  type: "student" | "teacher" | "both";
  duration: string;
  dates: string;
  slots: number;
  slotsRemaining: number;
  deadline: string;
  status: ProgramStatus;
  description: string;
  facilities: string[];
}

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "STEM Innovation Exchange",
    hostSchool: "Tokyo International Academy",
    country: "Japan",
    type: "student",
    duration: "3 months",
    dates: "Sep 2026 – Nov 2026",
    slots: 20,
    slotsRemaining: 8,
    deadline: "2026-07-15",
    status: "open",
    description: "Immerse in cutting-edge STEM education with Japanese innovation culture.",
    facilities: ["Lab Access", "Dormitory", "Meal Plan"],
  },
  {
    id: "2",
    title: "Cultural Leadership Program",
    hostSchool: "Oxford Preparatory School",
    country: "United Kingdom",
    type: "both",
    duration: "6 months",
    dates: "Jan 2027 – Jun 2027",
    slots: 15,
    slotsRemaining: 15,
    deadline: "2026-10-01",
    status: "open",
    description: "Develop leadership skills in one of the world's most prestigious academic environments.",
    facilities: ["Historic Campus", "Mentorship", "Sports"],
  },
  {
    id: "3",
    title: "Sustainability & Environment",
    hostSchool: "Nordic Green Academy",
    country: "Sweden",
    type: "student",
    duration: "4 months",
    dates: "Mar 2027 – Jun 2027",
    slots: 12,
    slotsRemaining: 0,
    deadline: "2026-12-15",
    status: "closed",
    description: "Study sustainability practices in Scandinavia's greenest campus.",
    facilities: ["Eco Dorms", "Field Trips", "Research Lab"],
  },
  {
    id: "4",
    title: "Teacher Exchange – Digital Pedagogy",
    hostSchool: "Singapore Digital Learning Hub",
    country: "Singapore",
    type: "teacher",
    duration: "2 months",
    dates: "Jul 2026 – Aug 2026",
    slots: 10,
    slotsRemaining: 5,
    deadline: "2026-05-30",
    status: "locked",
    description: "Master digital teaching tools at Asia's leading EdTech center.",
    facilities: ["Smart Classrooms", "Accommodation", "Workshop Access"],
  },
  {
    id: "5",
    title: "Arts & Humanities Exchange",
    hostSchool: "Florence Academy of Arts",
    country: "Italy",
    type: "student",
    duration: "5 months",
    dates: "Feb 2027 – Jun 2027",
    slots: 18,
    slotsRemaining: 12,
    deadline: "2026-11-01",
    status: "open",
    description: "Study art, history, and humanities in the birthplace of the Renaissance.",
    facilities: ["Studio Access", "Host Family", "Museum Pass"],
  },
  {
    id: "6",
    title: "Multilingual Immersion Program",
    hostSchool: "Lycée International de Paris",
    country: "France",
    type: "both",
    duration: "4 months",
    dates: "Sep 2026 – Dec 2026",
    slots: 25,
    slotsRemaining: 20,
    deadline: "2026-06-30",
    status: "open",
    description: "Master French language and culture while studying at a top Parisian lycée.",
    facilities: ["Language Lab", "Cultural Trips", "Host Family"],
  },
];

const statusConfig: Record<ProgramStatus, { label: string; icon: typeof Lock; className: string }> = {
  open: { label: "Open", icon: Unlock, className: "bg-secondary/10 text-secondary border-secondary/20" },
  closed: { label: "Closed", icon: Clock, className: "bg-destructive/10 text-destructive border-destructive/20" },
  locked: { label: "Locked", icon: Lock, className: "bg-accent/10 text-accent border-accent/20" },
};

function getDeadlineDays(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const ProgramCard = ({ program, index }: { program: Program; index: number }) => {
  const status = statusConfig[program.status];
  const StatusIcon = status.icon;
  const daysLeft = getDeadlineDays(program.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className={status.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <BookmarkPlus className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground mb-1">{program.title}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {program.hostSchool} · {program.country}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{program.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {program.duration}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            {program.slotsRemaining}/{program.slots} slots
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
          </div>
          <div>
            <Badge variant="outline" className="text-xs">
              {program.type === "both" ? "Student & Teacher" : program.type === "student" ? "Student" : "Teacher"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {program.facilities.map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">{f}</span>
          ))}
        </div>

        <Button
          className="w-full gradient-primary text-primary-foreground border-0"
          disabled={program.status !== "open"}
        >
          {program.status === "open" ? (
            <>Apply Now <ArrowRight className="ml-2 w-4 h-4" /></>
          ) : program.status === "locked" ? (
            <>Applications Locked <Lock className="ml-2 w-4 h-4" /></>
          ) : (
            <>Applications Closed</>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = mockPrograms.filter((p) => {
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
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Exchange <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-muted-foreground">
              Browse admin-curated programs from verified schools worldwide.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search programs, schools, or countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">🔓 Open</SelectItem>
                <SelectItem value="locked">🔒 Locked</SelectItem>
                <SelectItem value="closed">⏳ Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No programs found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((program, i) => (
                <ProgramCard key={program.id} program={program} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
