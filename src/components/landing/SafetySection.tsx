import { Shield, AlertTriangle, FileCheck, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const safeguards = [
  { icon: UserCheck, title: "Verified Schools Only", desc: "Every host school undergoes rigorous verification before listing." },
  { icon: FileCheck, title: "Digital Compliance", desc: "Visa tracking, parental consent, medical clearance — all managed digitally." },
  { icon: Shield, title: "Insurance & Supervision", desc: "Mandatory insurance, approved accommodations, and supervision ratios." },
  { icon: AlertTriangle, title: "Emergency SOS System", desc: "One-tap SOS alerts parents, schools, and AceEdX instantly." },
];

const SafetySection = () => (
  <section id="safety" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Safety & Trust Framework
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Safety is <span className="text-gradient">Non-Negotiable</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            From verified host families to emergency response systems, every layer of AceEdX
            is built to protect students and give parents peace of mind.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {safeguards.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-background border border-border"
            >
              <s.icon className="w-8 h-8 text-secondary mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SafetySection;
