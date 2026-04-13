import { Shield, Lock, Clock, FileText, MessageSquare, MapPin, Star, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Globe, title: "Global Marketplace", desc: "Browse admin-curated exchange programs from verified schools worldwide." },
  { icon: Lock, title: "Lock/Unlock System", desc: "Admin controls when applications open. Clear status indicators for every program." },
  { icon: Clock, title: "Deadline Engine", desc: "Real-time countdown timers ensure you never miss an application window." },
  { icon: FileText, title: "Secure Documents", desc: "Upload visas, medical clearances, and consent forms in one secure place." },
  { icon: Shield, title: "Safety First", desc: "SOS alerts, verified hosts, supervision ratios, and emergency workflows." },
  { icon: MessageSquare, title: "Communication Hub", desc: "Seamless messaging between schools, parents, and AceEdX admin." },
  { icon: MapPin, title: "Safety Tracking", desc: "Real-time location awareness and check-in system during exchanges." },
  { icon: Star, title: "Trust & Ratings", desc: "Community-driven trust scores for schools and programs." },
];

const FeaturesSection = () => (
  <section id="how-it-works" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Built for <span className="text-gradient">Trust & Control</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every feature is designed around safety, transparency, and admin-controlled quality.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
