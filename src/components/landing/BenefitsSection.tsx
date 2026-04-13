import { GraduationCap, School, Heart } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: GraduationCap,
    title: "For Students",
    items: ["Global exposure & cultural intelligence", "Confidence & independence", "Academic & personal growth"],
    gradient: "gradient-primary",
  },
  {
    icon: School,
    title: "For Schools",
    items: ["International reputation", "Structured & safe programs", "Increased admissions appeal"],
    gradient: "gradient-hero",
  },
  {
    icon: Heart,
    title: "For Parents",
    items: ["Full transparency & control", "Real-time safety updates", "Trust in verified programs"],
    gradient: "gradient-accent",
  },
];

const BenefitsSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Everyone <span className="text-gradient">Benefits</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A platform designed to empower every stakeholder in the exchange journey.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-2xl bg-card border border-border p-8 overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 ${b.gradient}`} />
            <div className={`w-14 h-14 rounded-xl ${b.gradient} flex items-center justify-center mb-6`}>
              <b.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-4 text-foreground">{b.title}</h3>
            <ul className="space-y-3">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
