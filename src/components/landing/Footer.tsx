import { Link } from "react-router-dom";
import aceedxLogo from "@/assets/aceedx-logo.png";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-2">
            <img src={aceedxLogo} alt="AceEdX" className="h-9 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Empowering Indian School Leaders Worldwide
          </p>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AceEdX · Global Immersive Program for School Leaders
        </div>

        <div className="text-right text-sm text-muted-foreground space-y-1">
          <p>Questions? Reach us at</p>
          <p>
            <a href="tel:+919373387800" className="text-primary hover:text-accent transition-colors font-medium">
              +91 93733 87800
            </a>
          </p>
          <p>
            <a
              href="https://www.aceedx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              www.aceedx.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
