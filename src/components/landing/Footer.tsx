import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Globe className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AceEdX</span>
          </div>
          <p className="text-sm opacity-70">
            The trusted global platform for international student and teacher exchanges.
          </p>
        </div>
        {[
          { title: "Platform", links: [["Programs", "/marketplace"], ["Safety", "#safety"], ["Trust", "#trust"]] },
          { title: "Company", links: [["About", "#about"], ["Contact", "#contact"], ["Careers", "#careers"]] },
          { title: "Legal", links: [["Privacy", "#privacy"], ["Terms", "#terms"], ["Compliance", "#compliance"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm opacity-50">
        © {new Date().getFullYear()} AceEdX Global Exchange Hub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
