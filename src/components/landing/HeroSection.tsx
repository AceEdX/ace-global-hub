import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe2, Users } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-globe.jpg";

const stats = [
  { icon: Globe2, value: "50+", label: "Countries" },
  { icon: Users, value: "10K+", label: "Students" },
  { icon: Shield, value: "100%", label: "Verified Schools" },
];

const HeroSection = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
    </div>

    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Trusted Global Exchange Platform
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Connect Schools.{" "}
            <span className="text-gradient">Exchange Futures.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            A secure, admin-controlled marketplace where schools worldwide participate in
            verified student and teacher exchange programs with complete transparency.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow" asChild>
              <Link to="/marketplace">
                Explore Programs <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Register Your School</Link>
            </Button>
          </div>

          <div className="flex gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold font-display text-foreground">{value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="Global student exchange network" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-md border border-border animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Verified & Safe</p>
                <p className="text-xs text-muted-foreground">All schools verified</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
