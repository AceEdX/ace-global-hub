import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import aceedxLogo from "@/assets/aceedx-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMarketplace = location.pathname === "/marketplace";

  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfkDPxPz5ZK_X2o_-zcrhXNMdBKf6eE4eFjk6WhCLN3jXZ-qw/viewform";

  const navLinks = isMarketplace
    ? [
        { label: "Programs", href: "#programs" },
        { label: "Why Sweden", href: "#why-sweden" },
        { label: "Itinerary", href: GOOGLE_FORM_URL, external: true },
        { label: "Eligibility", href: "#eligibility" },
        { label: "Register", href: "#register" },
      ]
    : [
        { label: "Programs", href: "/marketplace" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Safety", href: "#safety" },
        { label: "About", href: "#about" },
      ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={aceedxLogo} alt="AceEdX" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : 'external' in link && link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.aceedx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            aceedx.com
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="https://www.aceedx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-primary py-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                aceedx.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
